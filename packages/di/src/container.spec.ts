import type { BeanDefinition } from '@src/bean-definition';
import { defineBean } from '@src/bean-definition';
import { createContainer } from '@src/container';
import { expect } from '@ti-platform/aide-test';
import { describe, test, vi } from 'vitest';

const it = test.extend<{
    container: ReturnType<typeof createContainer>;
    simpleBean: BeanDefinition<string>;
    numberBean: BeanDefinition<number>;
    objectBean: BeanDefinition<{ value: string }>;
    dependentBean: BeanDefinition<{ dependency: string }>;
    circularBeanA: BeanDefinition<{ b: { a: unknown } }> | null;
    circularBeanB: BeanDefinition<{ a: { b: unknown } }> | null;
}>({
    container: async ({ task: _ }, use) => {
        await use(createContainer());
    },

    simpleBean: async ({ task: _ }, use) => {
        await use(defineBean('simple', () => 'simple-value'));
    },

    numberBean: async ({ task: _ }, use) => {
        await use(defineBean('number', () => 42));
    },

    objectBean: async ({ task: _ }, use) => {
        await use(defineBean('object', () => ({ value: 'object-value' })));
    },

    dependentBean: async ({ simpleBean }, use) => {
        await use(
            defineBean('dependent', (get) => {
                const dependency = get(simpleBean);
                return { dependency };
            })
        );
    },

    circularBeanA: async ({ task: _ }, use) => {
        // We'll define this in the test where it's needed
        await use(null);
    },

    circularBeanB: async ({ task: _ }, use) => {
        // We'll define this in the test where it's needed
        await use(null);
    },
});

describe('createContainer', () => {
    it('should create a new container instance', () => {
        const container1 = createContainer();
        const container2 = createContainer();

        expect(container1).toBeDefined();
        expect(container2).toBeDefined();
        expect(container1).not.toBe(container2);
    });

    it('should create a container with resolve method', () => {
        const container = createContainer();

        expect(container).toHaveProperty('resolve');
        expect(typeof container.resolve).toBe('function');
    });
});

describe('Container', () => {
    describe('resolve', () => {
        it('should resolve a simple bean', ({ container, simpleBean }) => {
            const result = container.resolve(simpleBean);

            expect(result).toBe('simple-value');
        });

        it('should resolve different types of beans', ({ container, simpleBean, numberBean, objectBean }) => {
            const stringResult = container.resolve(simpleBean);
            const numberResult = container.resolve(numberBean);
            const objectResult = container.resolve(objectBean);

            expect(stringResult).toBe('simple-value');
            expect(numberResult).toBe(42);
            expect(objectResult).toEqual({ value: 'object-value' });
        });

        it('should resolve beans with dependencies', ({ container, dependentBean }) => {
            const result = container.resolve(dependentBean);

            expect(result).toEqual({ dependency: 'simple-value' });
        });

        it('should resolve complex dependency chains', ({ container }) => {
            const configBean = defineBean('config', () => ({ apiUrl: 'https://api.example.com' }));
            const httpClientBean = defineBean('httpClient', (get) => {
                const config = get(configBean);
                return { baseUrl: config.apiUrl, timeout: 5000 };
            });
            const serviceBean = defineBean('service', (get) => {
                const client = get(httpClientBean);
                return { client, name: 'UserService' };
            });

            const result = container.resolve(serviceBean);

            expect(result).toEqual({
                client: { baseUrl: 'https://api.example.com', timeout: 5000 },
                name: 'UserService',
            });
        });
    });

    describe('singleton behavior', () => {
        it('should return the same instance for multiple resolve calls', ({ container, objectBean }) => {
            const instance1 = container.resolve(objectBean);
            const instance2 = container.resolve(objectBean);

            expect(instance1).toBe(instance2);
        });

        it('should maintain singleton behavior across dependency resolution', ({ container }) => {
            const sharedBean = defineBean('shared', () => ({ id: Math.random() }));
            const consumer1Bean = defineBean('consumer1', (get) => ({ shared: get(sharedBean) }));
            const consumer2Bean = defineBean('consumer2', (get) => ({ shared: get(sharedBean) }));

            const result1 = container.resolve(consumer1Bean);
            const result2 = container.resolve(consumer2Bean);

            expect(result1.shared).toBe(result2.shared);
            expect(result1.shared.id).toBe(result2.shared.id);
        });

        it('should call factory function only once per bean', ({ container }) => {
            const factorySpy = vi.fn().mockReturnValue('test-value');
            const bean = defineBean('spy', factorySpy);

            container.resolve(bean);
            container.resolve(bean);
            container.resolve(bean);

            expect(factorySpy).toHaveBeenCalledTimes(1);
        });
    });

    describe('circular dependency detection', () => {
        it('should detect direct circular dependencies', ({ container }) => {
            // Create beans with circular dependencies
            const beanA = defineBean('beanA', () => ({}));
            const beanB = defineBean('beanB', () => ({}));

            // Override factories to create circular dependency
            (beanA as { factory: unknown }).factory = (get: (bean: unknown) => unknown) => ({ b: get(beanB) });
            (beanB as { factory: unknown }).factory = (get: (bean: unknown) => unknown) => ({ a: get(beanA) });

            expect(() => container.resolve(beanA)).toThrowError('Circular dependency detected: beanA');
        });

        it('should detect indirect circular dependencies', ({ container }) => {
            // Create beans with indirect circular dependencies
            const beanA = defineBean('beanA', () => ({}));
            const beanB = defineBean('beanB', () => ({}));
            const beanC = defineBean('beanC', () => ({}));

            // Override factories to create circular dependency chain
            (beanA as { factory: unknown }).factory = (get: (bean: unknown) => unknown) => ({ b: get(beanB) });
            (beanB as { factory: unknown }).factory = (get: (bean: unknown) => unknown) => ({ c: get(beanC) });
            (beanC as { factory: unknown }).factory = (get: (bean: unknown) => unknown) => ({ a: get(beanA) });

            expect(() => container.resolve(beanA)).toThrowError('Circular dependency detected: beanA');
        });

        it('should include bean name in circular dependency error', ({ container }) => {
            const namedBean = defineBean('circular-bean', () => ({}));

            // Override factory to create self-reference
            (namedBean as { factory: unknown }).factory = (get: (bean: unknown) => unknown) => ({
                self: get(namedBean),
            });

            expect(() => container.resolve(namedBean)).toThrowError('Circular dependency detected: circular-bean');
        });

        it('should handle unnamed beans in circular dependency error', ({ container }) => {
            const unnamedBean = defineBean(() => ({}));

            // Override factory to create self-reference
            (unnamedBean as { factory: unknown }).factory = (get: (bean: unknown) => unknown) => ({
                self: get(unnamedBean),
            });

            expect(() => container.resolve(unnamedBean)).toThrowError('Circular dependency detected: undefined');
        });
    });

    describe('error handling', () => {
        it('should propagate errors from factory functions', ({ container }) => {
            const errorBean = defineBean('error', () => {
                throw new Error('Factory error');
            });

            expect(() => container.resolve(errorBean)).toThrowError('Factory error');
        });

        it('should propagate errors from dependency factories', ({ container }) => {
            const errorBean = defineBean('error', () => {
                throw new Error('Dependency error');
            });
            const dependentBean = defineBean('dependent', (get) => {
                const dep = get(errorBean);
                return { dep };
            });

            expect(() => container.resolve(dependentBean)).toThrowError('Dependency error');
        });

        it('should not cache failed resolutions', ({ container }) => {
            let shouldFail = true;
            const flakyBean = defineBean('flaky', () => {
                if (shouldFail) {
                    throw new Error('Temporary failure');
                }
                return 'success';
            });

            expect(() => container.resolve(flakyBean)).toThrowError('Temporary failure');

            shouldFail = false;
            const result = container.resolve(flakyBean);

            expect(result).toBe('success');
        });
    });

    describe('isolation between containers', () => {
        it('should maintain separate instances across different containers', () => {
            const container1 = createContainer();
            const container2 = createContainer();
            const bean = defineBean(() => ({ id: Math.random() }));

            const instance1 = container1.resolve(bean);
            const instance2 = container2.resolve(bean);

            expect(instance1).not.toBe(instance2);
            expect(instance1.id).not.toBe(instance2.id);
        });
    });
});
