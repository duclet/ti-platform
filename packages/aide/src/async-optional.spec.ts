import type { AsyncOptional } from '@src/async-optional';
import { createAsyncOptional, isAsyncOptional } from '@src/async-optional';
import { createOptional } from '@src/optional';
import { expect } from '@ti-platform/aide-test';
import { describe, test, vi } from 'vitest';

const it = test.extend<{
    absentOptional: AsyncOptional<string>;
    presentOptional: AsyncOptional<string>;
}>({
    absentOptional: async ({ task }, use) => {
        await use(createAsyncOptional());
    },

    presentOptional: async ({ task }, use) => {
        await use(createAsyncOptional('one'));
    },
});

describe('createAsyncOptional', () => {
    it('should create an absent optional when given is undefined or null', async () => {
        expect(await createAsyncOptional().isAbsent()).toBeTrue();
        expect(await createAsyncOptional(null).isAbsent()).toBeTrue();
    });

    it('should only have one absent optional instance', () => {
        expect(createAsyncOptional()).toBe(createAsyncOptional(null));
    });

    it('should create a present optional when a defined value is given', async () => {
        const optional = createAsyncOptional('one');
        expect(await optional.isPresent()).toBeTrue();
        expect(await optional.getOrThrow()).toBe('one');
    });

    it('should handle promises correctly', async () => {
        const optional = createAsyncOptional(Promise.resolve('one'));
        expect(await optional.isPresent()).toBeTrue();
        expect(await optional.getOrThrow()).toBe('one');

        expect(await createAsyncOptional(Promise.resolve(null)).isAbsent()).toBeTrue();
    });

    it('should handle Optional instances correctly', async () => {
        const result = createAsyncOptional(createOptional('one'));
        expect(await result.isPresent()).toBeTrue();
        expect(await result.getOrThrow()).toBe('one');

        expect(await createAsyncOptional(createOptional()).isAbsent()).toBeTrue();
    });

    it('should handle promises of Optional instances correctly', async () => {
        const result = createAsyncOptional(Promise.resolve(createOptional('one')));
        expect(await result.isPresent()).toBeTrue();
        expect(await result.getOrThrow()).toBe('one');

        expect(await createAsyncOptional(Promise.resolve(createOptional())).isAbsent()).toBeTrue();
    });
});

describe('AsyncAbsentOptional', () => {
    describe('filter', () => {
        it('should not call handler and just return AsyncAbsentOptional instance', async ({ absentOptional }) => {
            const handler = vi.fn<Parameters<(typeof absentOptional)['filter']>[0]>();

            const result = absentOptional.filter(handler);
            expect(await result.isAbsent()).toBeTrue();
            expect(handler).not.toHaveBeenCalled();
        });
    });

    describe('flatMap', () => {
        it('should not call handler and just return AsyncAbsentOptional instance', async ({ absentOptional }) => {
            const handler = vi.fn<Parameters<(typeof absentOptional)['flatMap']>[0]>();

            const result = absentOptional.flatMap(handler);
            expect(await result.isAbsent()).toBeTrue();
            expect(handler).not.toHaveBeenCalled();
        });
    });

    describe('getOrThrow', () => {
        it('should throw an exception', async ({ absentOptional }) => {
            const exceptionThrown = vi.fn();

            await absentOptional.getOrThrow().catch(exceptionThrown);

            expect(exceptionThrown).toHaveBeenCalledOnce();
        });
    });

    describe('ifAbsent', () => {
        it('should execute provided handler and return a AsyncPromiseOptional which is absent', async ({
            absentOptional,
        }) => {
            const handler = vi.fn<Parameters<(typeof absentOptional)['ifAbsent']>[0]>();

            const result = absentOptional.ifAbsent(handler);
            expect(handler).not.toHaveBeenCalled(); // Handler is called asynchronously

            // Wait for the promise to resolve
            await new Promise((resolve) => setTimeout(resolve, 0));

            expect(handler).toHaveBeenCalledOnce();
            expect(await result.isAbsent()).toBeTrue();
        });
    });

    describe('ifPresent', () => {
        it('should not call handler and just return AsyncAbsentOptional instance', async ({ absentOptional }) => {
            const handler = vi.fn<Parameters<(typeof absentOptional)['ifPresent']>[0]>();

            const result = absentOptional.ifPresent(handler);
            expect(await result.isAbsent()).toBeTrue();
            expect(handler).not.toHaveBeenCalled();
        });
    });

    describe('isAbsent', () => {
        it('should return true', async ({ absentOptional }) => {
            expect(await absentOptional.isAbsent()).toBeTrue();
        });
    });

    describe('isPresent', () => {
        it('should return false', async ({ absentOptional }) => {
            expect(await absentOptional.isPresent()).toBeFalse();
        });
    });

    describe('map', () => {
        it('should not call the mapper and just return AsyncAbsentOptional instance', async ({ absentOptional }) => {
            const handler = vi.fn<Parameters<(typeof absentOptional)['map']>[0]>();

            const result = absentOptional.map(handler);
            expect(handler).not.toHaveBeenCalled();
            expect(await result.isAbsent()).toBeTrue();
        });
    });

    describe('or', () => {
        it('should call the handler and return its optional value', async ({ absentOptional, presentOptional }) => {
            const handler = vi.fn<Parameters<(typeof absentOptional)['or']>[0]>().mockReturnValue(presentOptional);

            const result = absentOptional.or(handler);
            expect(handler).not.toHaveBeenCalled(); // Handler is called asynchronously

            // Wait for the promise to resolve
            await new Promise((resolve) => setTimeout(resolve, 0));

            expect(handler).toHaveBeenCalledOnce();
            expect(isAsyncOptional(result)).toBeTrue();
            expect(await result.getOrThrow()).toBe('one');
        });
    });

    describe('orElse', () => {
        it('should return the provided value', async ({ absentOptional }) => {
            expect(await absentOptional.orElse('one')).toBe('one');
        });
    });

    describe('orElseGet', () => {
        it('should call the handler and return its value', async ({ absentOptional }) => {
            const handler = vi.fn<Parameters<(typeof absentOptional)['orElseGet']>[0]>().mockReturnValue('one');

            expect(await absentOptional.orElseGet(handler)).toBe('one');
            expect(handler).toHaveBeenCalledOnce();
        });
    });

    describe('orElseThrow', () => {
        it('should throw the error returned by the handler', async ({ absentOptional }) => {
            const error = new Error('error');
            const handler = vi.fn<Parameters<(typeof absentOptional)['orElseThrow']>[0]>().mockReturnValue(error);

            const exceptionThrown = vi.fn();
            await absentOptional.orElseThrow(handler).catch(exceptionThrown);

            expect(handler).toHaveBeenCalledOnce();
            expect(exceptionThrown).toHaveBeenCalledWith(error);
        });
    });

    describe('orUndefined', () => {
        it('should return undefined', async ({ absentOptional }) => {
            expect(await absentOptional.orUndefined()).toBeUndefined();
        });
    });
});

describe('AsyncPresentOptional', () => {
    describe('filter', () => {
        it('should return an AsyncPromiseOptional which is absent if the handler returns false', async ({
            presentOptional,
        }) => {
            const handler = vi.fn<Parameters<(typeof presentOptional)['filter']>[0]>().mockResolvedValue(false);

            const result = presentOptional.filter(handler);
            expect(await result.isAbsent()).toBeTrue();
            expect(handler).toHaveBeenCalledOnce().toHaveBeenCalledWith('one');
        });

        it('should return an AsyncPromiseOptional which is present and have some value if the handler returns true', async ({
            presentOptional,
        }) => {
            const handler = vi.fn<Parameters<(typeof presentOptional)['filter']>[0]>().mockResolvedValue(true);

            const result = presentOptional.filter(handler);
            expect(await result.isPresent()).toBeTrue();
            expect(await result.getOrThrow()).toBe('one');
            expect(handler).toHaveBeenCalledOnce().toHaveBeenCalledWith('one');
        });
    });

    describe('flatMap', () => {
        it('should return an AsyncPromiseOptional which encapsulate the optional returned by the handler', async ({
            presentOptional,
        }) => {
            const otherOptional = createAsyncOptional('two');
            const handler = vi
                .fn<Parameters<(typeof presentOptional)['flatMap']>[0]>()
                .mockResolvedValue(otherOptional);

            const result = presentOptional.flatMap(handler);
            expect(await result.isPresent()).toBeTrue();
            expect(await result.getOrThrow()).toBe('two');
            expect(handler).toHaveBeenCalledOnce().toHaveBeenCalledWith('one');
        });
    });

    describe('getOrThrow', () => {
        it('should return the value', async ({ presentOptional }) => {
            expect(await presentOptional.getOrThrow()).toBe('one');
        });
    });

    describe('ifAbsent', () => {
        it('should return itself without calling handler', ({ presentOptional }) => {
            const handler = vi.fn<Parameters<(typeof presentOptional)['ifAbsent']>[0]>();

            expect(presentOptional.ifAbsent(handler)).toBe(presentOptional);
            expect(handler).not.toHaveBeenCalled();
        });
    });

    describe('ifPresent', () => {
        it('should call the handler and return itself', async ({ presentOptional }) => {
            const handler = vi.fn<Parameters<(typeof presentOptional)['ifPresent']>[0]>();

            const result = presentOptional.ifPresent(handler);
            expect(handler).not.toHaveBeenCalled(); // Handler is called asynchronously

            // Wait for the promise to resolve
            await new Promise((resolve) => setTimeout(resolve, 0));
            expect(handler).toHaveBeenCalledOnce().toHaveBeenCalledWith('one');
            expect(await result.isPresent()).toBeTrue();
        });
    });

    describe('isAbsent', () => {
        it('should return false', async ({ presentOptional }) => {
            expect(await presentOptional.isAbsent()).toBeFalse();
        });
    });

    describe('isPresent', () => {
        it('should return true', async ({ presentOptional }) => {
            expect(await presentOptional.isPresent()).toBeTrue();
        });
    });

    describe('map', () => {
        it('should create a new optional with the mapped value', async ({ presentOptional }) => {
            const handler = vi.fn<Parameters<(typeof presentOptional)['map']>[0]>().mockReturnValue('two');

            const result = presentOptional.map(handler);
            expect(await result.isPresent()).toBeTrue();
            expect(await result.getOrThrow()).toBe('two');
            expect(handler).toHaveBeenCalledOnce().toHaveBeenCalledWith('one');
        });
    });

    describe('or', () => {
        it('should return itself without calling handler', ({ presentOptional }) => {
            const handler = vi.fn<Parameters<(typeof presentOptional)['or']>[0]>();

            expect(presentOptional.or(handler)).toBe(presentOptional);
            expect(handler).not.toHaveBeenCalled();
        });
    });

    describe('orElse', () => {
        it('should return its value', async ({ presentOptional }) => {
            expect(await presentOptional.orElse('two')).toBe('one');
        });
    });

    describe('orElseGet', () => {
        it('should return its value without calling handler', async ({ presentOptional }) => {
            const handler = vi.fn<Parameters<(typeof presentOptional)['orElseGet']>[0]>();

            expect(await presentOptional.orElseGet(handler)).toBe('one');
            expect(handler).not.toHaveBeenCalled();
        });
    });

    describe('orElseThrow', () => {
        it('should return its value without calling handler or throwing anything', async ({ presentOptional }) => {
            const handler = vi.fn<Parameters<(typeof presentOptional)['orElseThrow']>[0]>();

            expect(await presentOptional.orElseThrow(handler)).toBe('one');
            expect(handler).not.toHaveBeenCalled();
        });
    });

    describe('orUndefined', () => {
        it('should return its value', async ({ presentOptional }) => {
            expect(await presentOptional.orUndefined()).toBe('one');
        });
    });
});

describe('AsyncPromiseOptional', () => {
    it('should properly delegate to the resolved optional', async () => {
        const promiseOptional = createAsyncOptional(Promise.resolve('test'));
        expect(await promiseOptional.isPresent()).toBeTrue();
        expect(await promiseOptional.getOrThrow()).toBe('test');

        const absentPromiseOptional = createAsyncOptional(Promise.resolve(null));
        expect(await absentPromiseOptional.isAbsent()).toBeTrue();
    });

    describe('filter', () => {
        it('should delegate filter to the resolved optional', async () => {
            const promiseOptional = createAsyncOptional(Promise.resolve('test'));
            const predicate = vi.fn().mockReturnValue(true);

            const result = promiseOptional.filter(predicate);
            expect(await result.isPresent()).toBeTrue();
            expect(predicate).toHaveBeenCalledWith('test');

            const predicateFalse = vi.fn().mockReturnValue(false);
            const resultFalse = promiseOptional.filter(predicateFalse);
            expect(await resultFalse.isAbsent()).toBeTrue();
        });
    });

    describe('flatMap', () => {
        it('should delegate flatMap to the resolved optional', async () => {
            const promiseOptional = createAsyncOptional(Promise.resolve('test'));
            const mapper = vi.fn().mockReturnValue(createAsyncOptional('mapped'));

            const result = promiseOptional.flatMap(mapper);
            expect(await result.isPresent()).toBeTrue();
            expect(await result.getOrThrow()).toBe('mapped');
            expect(mapper).toHaveBeenCalledWith('test');
        });
    });

    describe('ifAbsent', () => {
        it('should delegate ifAbsent to the resolved optional', async () => {
            const promiseOptional = createAsyncOptional(Promise.resolve(null));
            const handler = vi.fn();

            await promiseOptional.ifAbsent(handler).isAbsent();
            expect(handler).toHaveBeenCalledOnce();
        });
    });

    describe('ifPresent', () => {
        it('should delegate ifPresent to the resolved optional', async () => {
            const promiseOptional = createAsyncOptional(Promise.resolve('test'));
            const handler = vi.fn();

            await promiseOptional.ifPresent(handler).isPresent();
            expect(handler).toHaveBeenCalledWith('test');
        });
    });

    describe('map', () => {
        it('should delegate map to the resolved optional', async () => {
            const promiseOptional = createAsyncOptional(Promise.resolve('test'));
            const mapper = vi.fn().mockReturnValue('mapped');

            const result = promiseOptional.map(mapper);
            expect(await result.isPresent()).toBeTrue();
            expect(await result.getOrThrow()).toBe('mapped');
            expect(mapper).toHaveBeenCalledWith('test');
        });
    });

    describe('or', () => {
        it('should delegate or to the resolved optional', async () => {
            const absentPromiseOptional = createAsyncOptional<string>(Promise.resolve(null));
            const other = vi.fn().mockReturnValue(createAsyncOptional('other'));

            const result = absentPromiseOptional.or(other);
            expect(await result.isPresent()).toBeTrue();
            expect(await result.getOrThrow()).toBe('other');
            expect(other).toHaveBeenCalledOnce();
        });
    });

    describe('orElse', () => {
        it('should delegate orElse to the resolved optional', async () => {
            const absentPromiseOptional = createAsyncOptional<string>(Promise.resolve(null));
            expect(await absentPromiseOptional.orElse('other')).toBe('other');

            const presentPromiseOptional = createAsyncOptional(Promise.resolve('test'));
            expect(await presentPromiseOptional.orElse('other')).toBe('test');
        });
    });

    describe('orElseGet', () => {
        it('should delegate orElseGet to the resolved optional', async () => {
            const absentPromiseOptional = createAsyncOptional<string>(Promise.resolve(null));
            const other = vi.fn().mockReturnValue('other');

            expect(await absentPromiseOptional.orElseGet(other)).toBe('other');
            expect(other).toHaveBeenCalledOnce();
        });
    });

    describe('orElseThrow', () => {
        it('should delegate orElseThrow to the resolved optional', async () => {
            const absentPromiseOptional = createAsyncOptional<string>(Promise.resolve(null));
            const error = new Error('error');
            const errorFn = vi.fn().mockReturnValue(error);

            const exceptionThrown = vi.fn();
            await absentPromiseOptional.orElseThrow(errorFn).catch(exceptionThrown);

            expect(errorFn).toHaveBeenCalledOnce();
            expect(exceptionThrown).toHaveBeenCalledWith(error);
        });
    });

    describe('orUndefined', () => {
        it('should delegate orUndefined to the resolved optional', async () => {
            const absentPromiseOptional = createAsyncOptional<string>(Promise.resolve(null));
            expect(await absentPromiseOptional.orUndefined()).toBeUndefined();

            const presentPromiseOptional = createAsyncOptional(Promise.resolve('test'));
            expect(await presentPromiseOptional.orUndefined()).toBe('test');
        });
    });
});

describe('Async operations', () => {
    it('should handle async predicates in filter', async () => {
        const optional = createAsyncOptional('test');
        const asyncPredicate = vi.fn().mockResolvedValue(true);

        const result = optional.filter(asyncPredicate);
        expect(await result.isPresent()).toBeTrue();
        expect(asyncPredicate).toHaveBeenCalledWith('test');

        const asyncPredicateFalse = vi.fn().mockResolvedValue(false);
        const resultFalse = optional.filter(asyncPredicateFalse);
        expect(await resultFalse.isAbsent()).toBeTrue();
    });

    it('should handle async mappers in map', async () => {
        const optional = createAsyncOptional('test');
        const asyncMapper = vi.fn().mockResolvedValue('mapped');

        const result = optional.map(asyncMapper);
        expect(await result.isPresent()).toBeTrue();
        expect(await result.getOrThrow()).toBe('mapped');
        expect(asyncMapper).toHaveBeenCalledWith('test');
    });

    it('should handle async mappers in flatMap', async () => {
        const optional = createAsyncOptional('test');
        const asyncMapper = vi.fn().mockResolvedValue(createAsyncOptional('mapped'));

        const result = optional.flatMap(asyncMapper);
        expect(await result.isPresent()).toBeTrue();
        expect(await result.getOrThrow()).toBe('mapped');
        expect(asyncMapper).toHaveBeenCalledWith('test');
    });

    it('should handle async handlers in ifPresent', async () => {
        const optional = createAsyncOptional('test');
        const asyncHandler = vi.fn().mockResolvedValue(undefined);

        await optional.ifPresent(asyncHandler).isPresent();
        expect(asyncHandler).toHaveBeenCalledWith('test');
    });

    it('should handle async handlers in ifAbsent', async () => {
        const optional = createAsyncOptional<string>();
        const asyncHandler = vi.fn().mockResolvedValue(undefined);

        await optional.ifAbsent(asyncHandler).isAbsent();
        expect(asyncHandler).toHaveBeenCalledOnce();
    });

    it('should handle async handlers in or', async () => {
        const optional = createAsyncOptional<string>();
        const asyncHandler = vi.fn().mockResolvedValue(createAsyncOptional('other'));

        const result = optional.or(asyncHandler);
        expect(await result.isPresent()).toBeTrue();
        expect(await result.getOrThrow()).toBe('other');
    });

    it('should handle async handlers in orElseGet', async () => {
        const optional = createAsyncOptional<string>();
        const asyncHandler = vi.fn().mockResolvedValue('other');

        expect(await optional.orElseGet(asyncHandler)).toBe('other');
        expect(asyncHandler).toHaveBeenCalledOnce();
    });

    it('should handle async handlers in orElseThrow', async () => {
        const optional = createAsyncOptional<string>();
        const error = new Error('error');
        const asyncHandler = vi.fn().mockResolvedValue(error);

        const exceptionThrown = vi.fn();
        await optional.orElseThrow(asyncHandler).catch(exceptionThrown);

        expect(asyncHandler).toHaveBeenCalledOnce();
        expect(exceptionThrown).toHaveBeenCalledWith(error);
    });
});

describe('Chaining operations', () => {
    it('should support chaining multiple operations', async () => {
        const result = await createAsyncOptional('test')
            .map((value) => value.toUpperCase())
            .filter((value) => value.length > 2)
            .ifPresent(() => {
                /* do something */
            })
            .getOrThrow();

        expect(result).toBe('TEST');
    });

    it('should short-circuit on absent values when chaining', async () => {
        const mapFn = vi.fn().mockReturnValue('mapped');
        const filterFn = vi.fn().mockReturnValue(true);

        const result = createAsyncOptional<string>().map(mapFn).filter(filterFn);

        expect(await result.isAbsent()).toBeTrue();
        expect(mapFn).not.toHaveBeenCalled();
        expect(filterFn).not.toHaveBeenCalled();
    });

    it('should handle complex chains with async operations', async () => {
        const asyncMapper = vi.fn(() => Promise.resolve('ASYNC'));
        const asyncPredicate = vi.fn(() => Promise.resolve(true));
        const asyncHandler = vi.fn(() => Promise.resolve(undefined));

        const result = await createAsyncOptional('test')
            .map(asyncMapper)
            .filter(asyncPredicate)
            .ifPresent(asyncHandler)
            .orElse('fallback');

        expect(result).toBe('ASYNC');
        expect(asyncMapper).toHaveBeenCalledWith('test');
        expect(asyncPredicate).toHaveBeenCalledWith('ASYNC');
        expect(asyncHandler).toHaveBeenCalledWith('ASYNC');
    });

    it('should handle chains that result in absent values', async () => {
        const result = await createAsyncOptional('test')
            .filter((value) => value.length > 10) // This will make it absent
            .map((value) => value.toUpperCase()) // This won't be called
            .orElse('fallback');

        expect(result).toBe('fallback');
    });
});
