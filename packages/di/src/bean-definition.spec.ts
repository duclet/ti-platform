import type { BeanDefinition, FactoryFunction } from '@src/bean-definition';
import { defineBean } from '@src/bean-definition';
import { expect } from '@ti-platform/aide-test';
import { describe, test, vi } from 'vitest';

const it = test.extend<{
    simpleFactory: FactoryFunction<string>;
    complexFactory: FactoryFunction<{ value: number }>;
    dependentFactory: FactoryFunction<{ dependency: string }>;
}>({
    simpleFactory: async ({ task: _ }, use) => {
        await use(() => 'test-value');
    },

    complexFactory: async ({ task: _ }, use) => {
        await use(() => ({ value: 42 }));
    },

    dependentFactory: async ({ task: _ }, use) => {
        await use((get) => {
            const dependency = get({ id: Symbol('dependency'), factory: () => 'dependency-value' });
            return { dependency };
        });
    },
});

describe('defineBean', () => {
    describe('with factory function only', () => {
        it('should create a bean definition with a generated symbol ID', ({ simpleFactory }) => {
            const bean = defineBean(simpleFactory);

            expect(bean).toHaveProperty('id');
            expect(bean).toHaveProperty('factory', simpleFactory);
            expect(typeof bean.id).toBe('symbol');
            expect(bean.id.description).toBeUndefined();
        });

        it('should create different IDs for different bean definitions', ({ simpleFactory, complexFactory }) => {
            const bean1 = defineBean(simpleFactory);
            const bean2 = defineBean(complexFactory);

            expect(bean1.id).not.toBe(bean2.id);
        });

        it('should preserve the factory function', ({ simpleFactory }) => {
            const bean = defineBean(simpleFactory);

            expect(bean.factory).toBe(simpleFactory);
        });
    });

    describe('with name and factory function', () => {
        it('should create a bean definition with a named symbol ID', ({ simpleFactory }) => {
            const beanName = 'test-bean';
            const bean = defineBean(beanName, simpleFactory);

            expect(bean).toHaveProperty('id');
            expect(bean).toHaveProperty('factory', simpleFactory);
            expect(typeof bean.id).toBe('symbol');
            expect(bean.id.description).toBe(beanName);
        });

        it('should create different IDs for beans with different names', ({ simpleFactory }) => {
            const bean1 = defineBean('bean-1', simpleFactory);
            const bean2 = defineBean('bean-2', simpleFactory);

            expect(bean1.id).not.toBe(bean2.id);
            expect(bean1.id.description).toBe('bean-1');
            expect(bean2.id.description).toBe('bean-2');
        });

        it('should preserve the factory function', ({ simpleFactory }) => {
            const bean = defineBean('named-bean', simpleFactory);

            expect(bean.factory).toBe(simpleFactory);
        });
    });

    describe('factory function execution', () => {
        it('should execute factory function without dependencies', ({ simpleFactory }) => {
            const mockGetFunction = vi.fn();
            const bean = defineBean(simpleFactory);
            const result = bean.factory(mockGetFunction);

            expect(result).toBe('test-value');
            expect(mockGetFunction).not.toHaveBeenCalled();
        });

        it('should execute factory function with dependencies', () => {
            const dependencyBean: BeanDefinition<string> = {
                id: Symbol('dependency'),
                factory: () => 'dependency-value',
            };

            const mockGetFunction = vi.fn().mockReturnValue('mocked-dependency');

            const factory: FactoryFunction<{ dependency: string }> = (get) => {
                const dependency = get(dependencyBean);
                return { dependency };
            };

            const bean = defineBean(factory);
            const result = bean.factory(mockGetFunction);

            expect(result).toEqual({ dependency: 'mocked-dependency' });
            expect(mockGetFunction).toHaveBeenCalledWith(dependencyBean);
        });

        it('should pass the get function to factory when called', () => {
            const mockGetFunction = vi.fn();
            const factorySpy = vi.fn().mockReturnValue('result');
            const bean = defineBean(factorySpy);

            bean.factory(mockGetFunction);

            expect(factorySpy).toHaveBeenCalledWith(mockGetFunction);
        });
    });

    describe('bean definition structure', () => {
        it('should have readonly properties', ({ simpleFactory }) => {
            const bean = defineBean('test', simpleFactory);

            // TypeScript should enforce readonly, but we can test the structure
            expect(Object.getOwnPropertyDescriptor(bean, 'id')).toMatchObject({
                writable: true, // Note: readonly in TypeScript doesn't affect runtime
                enumerable: true,
                configurable: true,
            });

            expect(Object.getOwnPropertyDescriptor(bean, 'factory')).toMatchObject({
                writable: true,
                enumerable: true,
                configurable: true,
            });
        });

        it('should be a plain object with only id and factory properties', ({ simpleFactory }) => {
            const bean = defineBean('test', simpleFactory);

            expect(Object.keys(bean)).toEqual(['id', 'factory']);
            expect(Object.getPrototypeOf(bean)).toBe(Object.prototype);
        });
    });

    describe('type safety', () => {
        it('should maintain type information for factory return type', ({ complexFactory }) => {
            const bean = defineBean(complexFactory);
            const mockGet = vi.fn();

            const result = bean.factory(mockGet);

            // TypeScript should infer the correct type
            expect(result).toHaveProperty('value', 42);
            expect(typeof result.value).toBe('number');
        });
    });
});
