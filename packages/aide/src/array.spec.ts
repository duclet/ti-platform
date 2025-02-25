import { ensureType, first, firstDefined, firstDefinedOpt, firstOpt, keepOnlyDefined, toMap } from '@src/arrays';
import { createOptional } from '@src/optional';
import { expect } from '@ti-platform/aide-test';
import { describe, test, vi } from 'vitest';

const it = test.extend<{
    emptyArray: Array<number>;
    sampleArray: Array<number>;
}>({
    emptyArray: async ({ task }, use) => {
        await use([]);
    },

    sampleArray: async ({ task }, use) => {
        await use([1, 2, 3]);
    },
});

describe('ensureType', () => {
    it('should return a function that simply returns the original array', ({ sampleArray }) => {
        expect(ensureType<number>())
            .toBeInstanceOf(Function)
            .map((fn) => fn(sampleArray))
            .toBe(sampleArray);
    });
});

describe('first', () => {
    it('should return undefined for an empty array', ({ emptyArray }) => {
        expect(first(emptyArray)).toBeUndefined();
    });

    it('should return the first item in the array when it is not empty', ({ sampleArray }) => {
        expect(first(sampleArray)).toBe(1);
    });
});

describe('firstOpt', () => {
    it('should return an absent optional for an empty array', ({ emptyArray }) => {
        expect(firstOpt(emptyArray).isAbsent()).toBeTrue();
    });

    it('should return an optional for the first item in an array', ({ sampleArray }) => {
        expect(firstOpt(sampleArray).getOrThrow()).toBe(1);
    });
});

describe('firstDefined', () => {
    it('should return the first defined value from the list of handlers', () => {
        const handler1 = vi.fn().mockReturnValue(undefined);
        const handler2 = vi.fn().mockReturnValue('TWO');
        const handler3 = vi.fn().mockReturnValue('THREE');

        expect(firstDefined([handler1, handler2, handler3])).toBe('TWO');
        expect(handler1).toHaveBeenCalled();
        expect(handler2).toHaveBeenCalled();
        expect(handler3).not.toHaveBeenCalled();
    });

    it('should return null when all handlers return undefined', () => {
        const handler = vi.fn().mockReturnValue(undefined);

        expect(firstDefined([handler, handler, handler])).toBeUndefined();
        expect(handler).toHaveBeenCalledTimes(3);
    });

    it('should return undefined when the list is empty', () => {
        expect(firstDefined([])).toBeUndefined();
    });
});

describe('firstDefinedOpt', () => {
    it('should return an absent optional when list is empty', () => {
        expect(firstDefinedOpt([]).isAbsent()).toBeTrue();
    });

    it('should return an absent optional when nothing in list returns a present optional', () => {
        const handler = vi.fn().mockReturnValue(createOptional());

        expect(firstDefinedOpt([handler, handler]).isAbsent()).toBeTrue();
        expect(handler).toHaveBeenCalledTimes(2);
    });

    it('should return a present optional with the value for the first handler that does so', () => {
        const handler = vi
            .fn()
            .mockReturnValueOnce(createOptional())
            .mockReturnValueOnce(createOptional(1))
            .mockReturnValue(createOptional());

        expect(firstDefinedOpt([handler, handler, handler]))
            .toSatisfy((v) => v.isPresent())
            .toSatisfy((v) => v.getOrThrow() === 1);
        expect(handler).toHaveBeenCalledTimes(2);
    });
});

describe('keepOnlyDefined', () => {
    it('should remove null and undefined values', () => {
        expect(keepOnlyDefined([0, 1, null, 3, undefined, 5])).toEqual([0, 1, 3, 5]);
    });
});

describe('toMap', () => {
    it('should create an object using the key and value supplier', () => {
        const keySupplier = vi.fn<Parameters<typeof toMap>[1]>().mockImplementation((item, index) => `key_${index}`);
        const valueSupplier = vi.fn<Parameters<typeof toMap>[2]>().mockImplementation((item, key, index) => item);

        expect(toMap([{ value: 1 }, { value: 2 }], keySupplier, valueSupplier)).toEqual({
            key_0: { value: 1 },
            key_1: { value: 2 },
        });
        expect(keySupplier)
            .toHaveBeenCalledTimes(2)
            .toHaveBeenCalledWith({ value: 1 }, 0)
            .toHaveBeenCalledWith({ value: 2 }, 1);
        expect(valueSupplier)
            .toHaveBeenCalledTimes(2)
            .toHaveBeenCalledWith({ value: 1 }, 'key_0', 0)
            .toHaveBeenCalledWith({ value: 2 }, 'key_1', 1);
    });
});
