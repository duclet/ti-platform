import { asComputed, asRef, injectRefs, provideAndReturnRefs } from '@src/reactivity';
import { expect, matchAny } from '@ti-platform/aide-test';
import { describe, it, vi } from 'vitest';
import { inject, type InjectionKey, provide, reactive, ref } from 'vue';

vi.mock('vue', async () => {
    const actual = await vi.importActual('vue');
    return {
        ...actual,
        provide: vi.fn(),
        inject: vi.fn(),
    };
});

describe('reactivity', () => {
    describe('asComputed', () => {
        it('should convert a Ref to a ComputedRef', () => {
            const testRef = ref(42);
            const result = asComputed(testRef);

            expect(result.value).toBe(42);

            testRef.value = 100;
            expect(result.value).toBe(100);
        });
    });

    describe('asRef', () => {
        it('should convert a primitive value to a Ref', () => {
            const result = asRef(42);
            expect(result.value).toBe(42);
        });

        it('should handle arrays correctly', () => {
            const arr = [1, 2, 3];
            const result = asRef(arr);

            expect(result.value).toEqual([1, 2, 3]);

            arr.push(4);
            expect(result.value).toEqual([1, 2, 3, 4]);
        });

        it('should handle objects correctly', () => {
            const obj = { name: 'test', value: 42 };
            const result = asRef(obj);

            expect(result.value).toEqual({ name: 'test', value: 42 });

            obj.value = 100;
            expect(result.value).toEqual({ name: 'test', value: 100 });
        });
    });

    describe('injectRefs', () => {
        it('should inject data and return as refs', () => {
            const key = Symbol('test') as InjectionKey<{ count: number }>;
            const mockData = { count: 42 };

            vi.mocked(inject).mockReturnValue(reactive(mockData));

            const result = injectRefs(key);

            expect(inject).toHaveBeenCalledWith(key);
            expect(result).toHaveProperty('count');
            expect(result.count.value).toBe(42);
        });
    });

    describe('provideAndReturnRefs', () => {
        it('should provide data and return as refs', () => {
            const key = Symbol('test') as InjectionKey<{ count: number }>;
            const data = { count: 42 };
            const result = provideAndReturnRefs(key, data);

            expect(provide).toHaveBeenCalledWith(key, matchAny(Object));
            expect(result).toHaveProperty('count');
            expect(result.count.value).toBe(42);

            result.count.value = 100;
            expect(data.count).toBe(100);
        });
    });
});
