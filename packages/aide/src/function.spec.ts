import type { SingletonFunction } from '@src/function';
import { single } from '@src/function';
import { expect } from '@ti-platform/aide-test';
import { describe, test, vi } from 'vitest';

const it = test.extend<{
    objectFactory: () => { data: string };
    objectSingleton: SingletonFunction<{ data: string }>;
    primitiveFactory: () => number;
    primitiveSingleton: SingletonFunction<number>;
}>({
    objectFactory: async ({ task }, use) => {
        await use(() => ({ data: 'test' }));
    },

    objectSingleton: async ({ objectFactory }, use) => {
        await use(single(objectFactory));
    },

    primitiveFactory: async ({ task }, use) => {
        await use(() => 42);
    },

    primitiveSingleton: async ({ primitiveFactory }, use) => {
        await use(single(primitiveFactory));
    },
});

describe('single', () => {
    it('should execute factory function only once and cache result', () => {
        const factory = vi.fn(() => ({ data: 'test' }));
        const singletonFn = single(factory);

        const result1 = singletonFn();
        const result2 = singletonFn();
        const result3 = singletonFn();

        expect(factory).toHaveBeenCalledTimes(1);
        expect(result1).toBe(result2);
        expect(result2).toBe(result3);
        expect(result1).toEqual({ data: 'test' });
    });

    it('should maintain referential equality for cached results', ({ objectSingleton }) => {
        const result1 = objectSingleton();
        const result2 = objectSingleton();

        expect(result1).toBe(result2);
    });

    it('should reset cache and allow factory function to execute again', () => {
        const factory = vi.fn(() => ({ counter: Math.random() }));
        const singletonFn = single(factory);

        const result1 = singletonFn();
        expect(factory).toHaveBeenCalledTimes(1);

        singletonFn.reset();
        const result2 = singletonFn();
        expect(factory).toHaveBeenCalledTimes(2);

        expect(result1).not.toBe(result2);
    });

    it('should reset and call factory function immediately with resetAndCall', () => {
        const factory = vi.fn(() => ({ value: 'new' }));
        const singletonFn = single(factory);

        const result1 = singletonFn();
        expect(factory).toHaveBeenCalledTimes(1);

        const result2 = singletonFn.resetAndCall();
        expect(factory).toHaveBeenCalledTimes(2);

        expect(result1).not.toBe(result2);
        expect(result2).toEqual({ value: 'new' });
    });

    it('should work with primitive values', ({ primitiveSingleton }) => {
        const result1 = primitiveSingleton();
        const result2 = primitiveSingleton();

        expect(result1).toBe(42);
        expect(result2).toBe(42);
        expect(result1).toBe(result2);
    });

    it('should work with string values', () => {
        const factory = vi.fn(() => 'hello world');
        const singletonFn = single(factory);

        const result1 = singletonFn();
        const result2 = singletonFn();

        expect(factory).toHaveBeenCalledTimes(1);
        expect(result1).toBe('hello world');
        expect(result2).toBe('hello world');
    });

    it('should work with null and undefined values', () => {
        const nullFactory = vi.fn(() => null);
        const undefinedFactory = vi.fn(() => undefined);

        const nullSingleton = single(nullFactory);
        const undefinedSingleton = single(undefinedFactory);

        expect(nullSingleton()).toBe(null);
        expect(nullSingleton()).toBe(null);
        expect(nullFactory).toHaveBeenCalledTimes(1);

        expect(undefinedSingleton()).toBe(undefined);
        expect(undefinedSingleton()).toBe(undefined);
        expect(undefinedFactory).toHaveBeenCalledTimes(1);
    });

    it('should propagate errors from factory function and not cache them', () => {
        const error = new Error('Factory error');
        const factory = vi.fn(() => {
            throw error;
        });
        const singletonFn = single(factory);

        expect(() => singletonFn()).toThrowError('Factory error');
        expect(() => singletonFn()).toThrowError('Factory error');
        expect(factory).toHaveBeenCalledTimes(2);
    });

    it('should cache successful result after previous errors', () => {
        let callCount = 0;
        const factory = vi.fn(() => {
            callCount++;
            if (callCount <= 2) {
                throw new Error('Temporary error');
            }
            return { success: true };
        });
        const singletonFn = single(factory);

        expect(() => singletonFn()).toThrowError('Temporary error');
        expect(() => singletonFn()).toThrowError('Temporary error');

        const result1 = singletonFn();
        const result2 = singletonFn();

        expect(factory).toHaveBeenCalledTimes(3);
        expect(result1).toBe(result2);
        expect(result1).toEqual({ success: true });
    });

    it('should handle complex object structures', () => {
        const complexObject = {
            nested: {
                array: [1, 2, 3],
                map: new Map([['key', 'value']]),
                set: new Set([1, 2, 3]),
            },
            fn: () => 'test',
        };
        const factory = vi.fn(() => complexObject);
        const singletonFn = single(factory);

        const result1 = singletonFn();
        const result2 = singletonFn();

        expect(factory).toHaveBeenCalledTimes(1);
        expect(result1).toBe(result2);
        expect(result1.nested.array).toBe(complexObject.nested.array);
        expect(result1.fn()).toBe('test');
    });

    it('should work with factory functions that return functions', () => {
        const innerFunction = () => 'inner result';
        const factory = vi.fn(() => innerFunction);
        const singletonFn = single(factory);

        const result1 = singletonFn();
        const result2 = singletonFn();

        expect(factory).toHaveBeenCalledTimes(1);
        expect(result1).toBe(result2);
        expect(result1).toBe(innerFunction);
        expect(result1()).toBe('inner result');
    });

    it('should maintain independent caches for different singleton instances', () => {
        const factory1 = vi.fn(() => ({ id: 1 }));
        const factory2 = vi.fn(() => ({ id: 2 }));

        const singleton1 = single(factory1);
        const singleton2 = single(factory2);

        const result1a = singleton1();
        const result2a = singleton2();
        const result1b = singleton1();
        const result2b = singleton2();

        expect(factory1).toHaveBeenCalledTimes(1);
        expect(factory2).toHaveBeenCalledTimes(1);
        expect(result1a).toBe(result1b);
        expect(result2a).toBe(result2b);
        expect(result1a).not.toBe(result2a);
    });
});
