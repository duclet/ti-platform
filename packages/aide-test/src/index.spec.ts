import {
    expect,
    expectToFail,
    expectToHaveAssertions,
    expectToHaveAssertionTimes,
    matchAny,
    matchAnything,
    matchArrayContaining,
    matchCloseTo,
    matchObjectContaining,
    matchStringContaining,
    matchStringMatching,
    softExpect,
} from '@src/index';
import { describe, it, vi } from 'vitest';

describe('expect', () => {
    describe('not', () => {
        it('should invert the assertion', () => {
            expect(5).not.toBe(6);
            expect('hello').not.toBe('world');
        });

        it('should work with other matchers', () => {
            expect(5).not.toBeGreaterThan(10);
            expect([1, 2, 3]).not.toContain(4);
            expect({ a: 1 }).not.toHaveProperty('b');
        });

        it('should be chainable', () => {
            expect(5).not.toBe(6).toBeGreaterThan(10);
        });
    });
    describe('map', () => {
        it('should apply a function to the value and return a new assertion', () => {
            expect(5)
                .map((x) => x * 2)
                .toBe(10);
        });

        it('should chain multiple map calls', () => {
            expect(5)
                .map((x) => x * 2)
                .map((x) => x + 1)
                .toBe(11);
        });
    });

    describe('parent', () => {
        it('should return the parent assertion', () => {
            const assertion = expect(5).map((x) => x * 2);
            assertion.parent().toBe(5);
        });

        it('should throw an error if there is no parent', () => {
            expect(() => expect(5).parent()).toThrowError();
        });
    });

    describe('toBe', () => {
        it('should assert strict equality', () => {
            expect(5).toBe(5);
            expect('hello').toBe('hello');
            expect(true).toBe(true);
        });

        it('should fail for non-strict equality', () => {
            expect(() => expect(5).toBe(6)).toThrowError();
            expect(() => expect({}).toBe({})).toThrowError();
        });
    });

    describe('toBeCloseTo', () => {
        it('should assert that numbers are close to each other', () => {
            expect(0.1 + 0.2).toBeCloseTo(0.3);
            expect(1.23).toBeCloseTo(1.2, 1);
        });

        it('should fail when numbers are not close enough', () => {
            expect(() => expect(1.23).toBeCloseTo(1.2)).toThrowError();
        });
    });

    describe('toBeDefined', () => {
        it('should assert that a value is defined', () => {
            expect('hello').toBeDefined();
            expect(0).toBeDefined();
            expect(false).toBeDefined();
        });

        it('should fail for undefined values', () => {
            expect(() => expect(undefined).toBeDefined()).toThrowError();
        });
    });

    describe('toBeFalse', () => {
        it('should assert that a value is false', () => {
            expect(false).toBeFalse();
        });

        it('should fail for truthy values', () => {
            expect(() => expect(true).toBeFalse()).toThrowError();
            expect(() => expect(1).toBeFalse()).toThrowError();
            expect(() => expect('hello').toBeFalse()).toThrowError();
        });
    });

    describe('toBeFalsy', () => {
        it('should assert that a value is falsy', () => {
            expect(false).toBeFalsy();
            expect(0).toBeFalsy();
            expect('').toBeFalsy();
            expect(null).toBeFalsy();
            expect(undefined).toBeFalsy();
        });

        it('should fail for truthy values', () => {
            expect(() => expect(true).toBeFalsy()).toThrowError();
            expect(() => expect(1).toBeFalsy()).toThrowError();
            expect(() => expect('hello').toBeFalsy()).toThrowError();
        });
    });

    describe('toBeGreaterThan', () => {
        it('should assert that a number is greater than another number', () => {
            expect(5).toBeGreaterThan(3);
        });

        it('should fail when the number is not greater', () => {
            expect(() => expect(3).toBeGreaterThan(5)).toThrowError();
        });
    });

    describe('toBeGreaterThanOrEqual', () => {
        it('should assert that a number is greater than or equal to another number', () => {
            expect(5).toBeGreaterThanOrEqual(5);
            expect(6).toBeGreaterThanOrEqual(5);
        });

        it('should fail when the number is less', () => {
            expect(() => expect(3).toBeGreaterThanOrEqual(5)).toThrowError();
        });
    });

    describe('toBeInstanceOf', () => {
        it('should assert that a value is an instance of a class', () => {
            expect(new Date()).toBeInstanceOf(Date);
        });

        it('should fail when the value is not an instance of the class', () => {
            expect(() => expect({}).toBeInstanceOf(Date)).toThrowError();
        });
    });

    describe('toBeLessThan', () => {
        it('should assert that a number is less than another number', () => {
            expect(3).toBeLessThan(5);
        });

        it('should fail when the number is not less', () => {
            expect(() => expect(5).toBeLessThan(3)).toThrowError();
        });
    });

    describe('toBeLessThanOrEqual', () => {
        it('should assert that a number is less than or equal to another number', () => {
            expect(5).toBeLessThanOrEqual(5);
            expect(4).toBeLessThanOrEqual(5);
        });

        it('should fail when the number is greater', () => {
            expect(() => expect(6).toBeLessThanOrEqual(5)).toThrowError();
        });
    });

    describe('toBeNaN', () => {
        it('should assert that a value is NaN', () => {
            expect(NaN).toBeNaN();
        });

        it('should fail when the value is not NaN', () => {
            expect(() => expect(5).toBeNaN()).toThrowError();
        });
    });

    describe('toBeNull', () => {
        it('should assert that a value is null', () => {
            expect(null).toBeNull();
        });

        it('should fail when value is not null', () => {
            expect(() => expect(undefined).toBeNull()).toThrowError();
            expect(() => expect(0).toBeNull()).toThrowError();
            expect(() => expect('').toBeNull()).toThrowError();
        });
    });

    describe('toBeTrue', () => {
        it('should assert that a value is true', () => {
            expect(true).toBeTrue();
        });

        it('should fail for falsy values', () => {
            expect(() => expect(false).toBeTrue()).toThrowError();
            expect(() => expect(0).toBeTrue()).toThrowError();
            expect(() => expect('').toBeTrue()).toThrowError();
        });
    });

    describe('toBeTruthy', () => {
        it('should assert that a value is truthy', () => {
            expect(true).toBeTruthy();
            expect(1).toBeTruthy();
            expect('hello').toBeTruthy();
            expect({}).toBeTruthy();
            expect([]).toBeTruthy();
        });

        it('should fail for falsy values', () => {
            expect(() => expect(false).toBeTruthy()).toThrowError();
            expect(() => expect(0).toBeTruthy()).toThrowError();
            expect(() => expect('').toBeTruthy()).toThrowError();
            expect(() => expect(null).toBeTruthy()).toThrowError();
            expect(() => expect(undefined).toBeTruthy()).toThrowError();
        });
    });

    describe('toBeTypeOf', () => {
        it('should assert that a value is of a specific type', () => {
            expect(BigInt(1234)).toBeTypeOf('bigint');
            expect(true).toBeTypeOf('boolean');
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            expect(() => {}).toBeTypeOf('function');
            expect(42).toBeTypeOf('number');
            expect({}).toBeTypeOf('object');
            expect('hello').toBeTypeOf('string');
            expect(Symbol('test')).toBeTypeOf('symbol');
            expect(undefined).toBeTypeOf('undefined');
        });

        it('should fail when the value is not of the specified type', () => {
            expect(() => expect(5).toBeTypeOf('string')).toThrowError();
            expect(() => expect('hello').toBeTypeOf('number')).toThrowError();
            expect(() => expect(true).toBeTypeOf('object')).toThrowError();
        });
    });

    describe('toBeUndefined', () => {
        it('should assert that a value is undefined', () => {
            expect(undefined).toBeUndefined();
        });

        it('should fail when value is not undefined', () => {
            expect(() => expect(null).toBeUndefined()).toThrowError();
            expect(() => expect(0).toBeUndefined()).toThrowError();
            expect(() => expect('').toBeUndefined()).toThrowError();
        });
    });

    describe('toContain', () => {
        it('should assert that an array contains an item', () => {
            expect([1, 2, 3]).toContain(2);
            expect('hello').toContain('ell');
        });

        it('should fail when array does not contain the item', () => {
            expect(() => expect([1, 2, 3]).toContain(4)).toThrowError();
            expect(() => expect('hello').toContain('world')).toThrowError();
        });
    });

    describe('toContainEqual', () => {
        it('should assert that an array contains an item with deep equality', () => {
            expect([{ a: 1 }, { b: 2 }]).toContainEqual({ a: 1 });
        });

        it('should fail when array does not contain the item', () => {
            expect(() => expect([{ a: 1 }, { b: 2 }]).toContainEqual({ c: 3 })).toThrowError();
        });
    });

    describe('toEqual', () => {
        it('should assert deep equality for objects', () => {
            expect({ a: 1, b: 2 }).toEqual({ a: 1, b: 2 });
            expect([1, 2, 3]).toEqual([1, 2, 3]);
        });

        it('should fail when objects are not deeply equal', () => {
            expect(() => expect({ a: 1 }).toEqual({ a: 2 })).toThrowError();
            expect(() => expect([1, 2]).toEqual([1, 2, 3])).toThrowError();
        });
    });

    describe('toHaveBeenCalled', () => {
        it('should assert that a mock function was called', () => {
            const mockFn = vi.fn();
            mockFn();
            expect(mockFn).toHaveBeenCalled();
        });

        it('should fail when mock function was not called', () => {
            const mockFn = vi.fn();
            expect(() => expect(mockFn).toHaveBeenCalled()).toThrowError();
        });
    });

    describe('toHaveBeenCalledOnce', () => {
        it('should assert that a mock function was called exactly once', () => {
            const mockFn = vi.fn();
            mockFn();
            expect(mockFn).toHaveBeenCalledOnce();
        });

        it('should fail when mock function was not called exactly once', () => {
            const mockFn = vi.fn();
            mockFn();
            mockFn();
            expect(() => expect(mockFn).toHaveBeenCalledOnce()).toThrowError();
        });
    });

    describe('toHaveBeenCalledTimes', () => {
        it('should assert that a mock function was called n times', () => {
            const mockFn = vi.fn();
            mockFn();
            mockFn();
            expect(mockFn).toHaveBeenCalledTimes(2);
        });

        it('should fail when mock function was not called n times', () => {
            const mockFn = vi.fn();
            mockFn();
            expect(() => expect(mockFn).toHaveBeenCalledTimes(2)).toThrowError();
        });
    });

    describe('toHaveBeenCalledWith', () => {
        it('should assert that a mock function was called with specific arguments', () => {
            const mockFn = vi.fn();
            mockFn(1, 'a', true);
            expect(mockFn).toHaveBeenCalledWith(1, 'a', true);
        });

        it('should fail when mock function was not called with specific arguments', () => {
            const mockFn = vi.fn();
            mockFn(1, 'a');
            expect(() => expect(mockFn).toHaveBeenCalledWith(1, 'b')).toThrowError();
        });
    });

    describe('toHaveBeenLastCalledWith', () => {
        it('should assert that a mock function was last called with specific arguments', () => {
            const mockFn = vi.fn();
            mockFn(1, 'a');
            mockFn(2, 'b');
            expect(mockFn).toHaveBeenLastCalledWith(2, 'b');
        });

        it('should fail when mock function was not last called with specific arguments', () => {
            const mockFn = vi.fn();
            mockFn(1, 'a');
            mockFn(2, 'b');
            expect(() => expect(mockFn).toHaveBeenLastCalledWith(1, 'a')).toThrowError();
        });
    });

    describe('toHaveBeenNthCalledWith', () => {
        it('should assert that a mock function was nth called with specific arguments', () => {
            const mockFn = vi.fn();
            mockFn(1, 'a');
            mockFn(2, 'b');
            mockFn(3, 'c');
            expect(mockFn).toHaveBeenNthCalledWith(2, 2, 'b');
        });

        it('should fail when mock function was not nth called with specific arguments', () => {
            const mockFn = vi.fn();
            mockFn(1, 'a');
            mockFn(2, 'b');
            expect(() => expect(mockFn).toHaveBeenNthCalledWith(2, 1, 'a')).toThrowError();
        });
    });

    describe('toHaveLastResolvedWith', () => {
        it('should assert that the last resolved value of a promise matches an expected value', async () => {
            const mockFn = vi.fn().mockResolvedValueOnce('first').mockResolvedValueOnce('second');
            await mockFn();
            await mockFn();
            expect(mockFn).toHaveLastResolvedWith('second');
        });

        it('should fail when the last resolved value does not match the expected value', async () => {
            const mockFn = vi.fn().mockResolvedValueOnce('first').mockResolvedValueOnce('second');
            await mockFn();
            await mockFn();
            expect(() => expect(mockFn).toHaveLastResolvedWith('first')).toThrowError();
        });
    });

    describe('toHaveLastReturnedWith', () => {
        it('should assert that the last returned value of a mock function matches an expected value', () => {
            const mockFn = vi.fn().mockReturnValueOnce('first').mockReturnValueOnce('second');
            mockFn();
            mockFn();
            expect(mockFn).toHaveLastReturnedWith('second');
        });

        it('should fail when the last returned value does not match the expected value', () => {
            const mockFn = vi.fn().mockReturnValueOnce('first').mockReturnValueOnce('second');
            mockFn();
            mockFn();
            expect(() => expect(mockFn).toHaveLastReturnedWith('first')).toThrowError();
        });

        it('should fail when the mock function throws an error', () => {
            const mockFn = vi.fn().mockImplementationOnce(() => {
                throw new Error('Test error');
            });
            expect(() => mockFn()).toThrowError();
            expect(() => expect(mockFn).toHaveLastReturnedWith('any value')).toThrowError();
        });
    });

    describe('toHaveLength', () => {
        it('should assert that an object has a length property with a certain value', () => {
            expect([1, 2, 3]).toHaveLength(3);
            expect('hello').toHaveLength(5);
        });

        it('should fail when object does not have expected length', () => {
            expect(() => expect([1, 2]).toHaveLength(3)).toThrowError();
            expect(() => expect('hello').toHaveLength(4)).toThrowError();
        });
    });

    describe('toHaveNthResolvedWith', () => {
        it('should assert that a specific value was returned by a promise on the nth resolution', async () => {
            const mockFn = vi.fn().mockResolvedValueOnce('first').mockResolvedValueOnce('second');
            await mockFn();
            await mockFn();
            expect(mockFn).toHaveNthResolvedWith(2, 'second');
        });

        it('should fail when the specific value was not returned on the nth resolution', async () => {
            const mockFn = vi.fn().mockResolvedValueOnce('first').mockResolvedValueOnce('second');
            await mockFn();
            await mockFn();
            expect(() => expect(mockFn).toHaveNthResolvedWith(2, 'first')).toThrowError();
        });
    });

    describe('toHaveNthReturnedWith', () => {
        it('should assert that a specific value was returned by a mock function on the nth call', () => {
            const mockFn = vi.fn().mockReturnValueOnce('first').mockReturnValueOnce('second');
            mockFn();
            mockFn();
            expect(mockFn).toHaveNthReturnedWith(2, 'second');
        });

        it('should fail when the specific value was not returned on the nth call', () => {
            const mockFn = vi.fn().mockReturnValueOnce('first').mockReturnValueOnce('second');
            mockFn();
            mockFn();
            expect(() => expect(mockFn).toHaveNthReturnedWith(2, 'first')).toThrowError();
        });
    });

    describe('toHaveProperty', () => {
        it('should assert that an object has a property with a certain value', () => {
            expect({ a: 1, b: 2 }).toHaveProperty('a', 1);
            expect({ a: { b: 2 } }).toHaveProperty('a.b', 2);
        });

        it('should fail when object does not have expected property', () => {
            expect(() => expect({ a: 1 }).toHaveProperty('b')).toThrowError();
            expect(() => expect({ a: 1 }).toHaveProperty('a', 2)).toThrowError();
        });
    });

    describe('toHaveResolved', () => {
        it('should assert that a promise has resolved successfully', async () => {
            const mockFn = vi.fn().mockResolvedValue('resolved');
            await mockFn();
            expect(mockFn).toHaveResolved();
        });
    });

    describe('toHaveResolvedTimes', () => {
        it('should assert that a promise has resolved a certain number of times', async () => {
            const mockFn = vi.fn().mockResolvedValue('resolved');
            await mockFn();
            await mockFn();
            expect(mockFn).toHaveResolvedTimes(2);
        });

        it('should fail when promise has not resolved the expected number of times', async () => {
            const mockFn = vi.fn().mockResolvedValue('resolved');
            await mockFn();
            expect(() => expect(mockFn).toHaveResolvedTimes(2)).toThrowError();
        });
    });

    describe('toHaveResolvedWith', () => {
        it('should assert that a promise has resolved with a certain value', async () => {
            const mockFn = vi.fn().mockResolvedValue('resolved');
            await mockFn();
            expect(mockFn).toHaveResolvedWith('resolved');
        });

        it('should fail when promise has not resolved with the expected value', async () => {
            const mockFn = vi.fn().mockResolvedValue('resolved');
            await mockFn();
            expect(() => expect(mockFn).toHaveResolvedWith('unresolved')).toThrowError();
        });
    });

    describe('toHaveReturned', () => {
        it('should assert that a mock function has returned successfully', () => {
            const mockFn = vi.fn().mockReturnValue('returned');
            mockFn();
            expect(mockFn).toHaveReturned();
        });

        it('should fail when mock function has not returned', () => {
            const mockFn = vi.fn().mockImplementation(() => {
                throw new Error('test error');
            });
            expect(() => mockFn()).toThrowError();
            expect(() => expect(mockFn).toHaveReturned()).toThrowError();
        });
    });

    describe('toHaveReturnedTimes', () => {
        it('should assert that a mock function has returned a certain number of times', () => {
            const mockFn = vi.fn().mockReturnValue('returned');
            mockFn();
            mockFn();
            expect(mockFn).toHaveReturnedTimes(2);
        });

        it('should fail when mock function has not returned the expected number of times', () => {
            const mockFn = vi.fn().mockReturnValue('returned');
            mockFn();
            expect(() => expect(mockFn).toHaveReturnedTimes(2)).toThrowError();
        });
    });

    describe('toHaveReturnedWith', () => {
        it('should assert that a mock function has returned with a certain value', () => {
            const mockFn = vi.fn().mockReturnValue('returned');
            mockFn();
            expect(mockFn).toHaveReturnedWith('returned');
        });

        it('should fail when mock function has not returned with the expected value', () => {
            const mockFn = vi.fn().mockReturnValue('returned');
            mockFn();
            expect(() => expect(mockFn).toHaveReturnedWith('unreturned')).toThrowError();
        });
    });

    describe('toHaveSize', () => {
        it('should assert that an object has a size property with a certain value', () => {
            expect(new Set([1, 2, 3])).toHaveSize(3);
            expect(
                new Map([
                    ['a', 1],
                    ['b', 2],
                    ['c', 3],
                ])
            ).toHaveSize(3);
        });

        it('should fail when object does not have expected size', () => {
            expect(() => expect(new Set([1, 2])).toHaveSize(3)).toThrowError();
            expect(() =>
                expect(
                    new Map([
                        ['a', 1],
                        ['b', 2],
                    ])
                ).toHaveSize(3)
            ).toThrowError();
        });
    });

    describe('toMatch', () => {
        it('should assert that a string matches a regular expression or string', () => {
            expect('hello world').toMatch(/world/);
            expect('hello world').toMatch('world');
        });

        it('should fail when string does not match', () => {
            expect(() => expect('hello world').toMatch(/universe/)).toThrowError();
            expect(() => expect('hello world').toMatch('universe')).toThrowError();
        });
    });

    describe('toMatchObject', () => {
        it('should assert that an object matches a subset of properties', () => {
            expect({ a: 1, b: 2, c: 3 }).toMatchObject({ a: 1, b: 2 });
            expect([{ a: 1 }, { b: 2, c: 3 }]).toMatchObject([{ a: 1 }, { b: 2 }]);
        });

        it('should fail when object does not match subset', () => {
            expect(() => expect({ a: 1 }).toMatchObject({ b: 2 })).toThrowError();
            expect(() => expect([{ a: 1 }]).toMatchObject([{ b: 2 }])).toThrowError();
        });
    });

    describe('toSatisfy', () => {
        it('should assert that a value satisfies a predicate', () => {
            expect(5).toSatisfy((n) => n > 0 && n < 10);
        });

        it('should fail when the value does not satisfy the predicate', () => {
            expect(() => expect(15).toSatisfy((n) => n > 0 && n < 10)).toThrowError();
        });
    });

    describe('toStrictEqual', () => {
        it('should assert that a value is strictly equal to another value', () => {
            expect({ a: 1, b: 2 }).toStrictEqual({ a: 1, b: 2 });
        });

        it('should fail when values are not strictly equal', () => {
            expect(() => expect({ a: 1, b: 2 }).toStrictEqual({ a: 1, b: 3 })).toThrowError();
        });
    });

    describe('toThrowError', () => {
        it('should assert that a function throws an error', () => {
            expect(() => {
                throw new Error('test error');
            }).toThrowError();
            expect(() => {
                throw new Error('test error');
            }).toThrowError('test error');
            expect(() => {
                throw new Error('test error');
            }).toThrowError(/test/);
        });

        it('should fail when function does not throw', () => {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            expect(() => expect(() => {}).toThrowError()).toThrowError();
        });
    });

    describe.skip('toMatchSnapshot', () => {
        it('should assert that a value matches a stored snapshot', () => {
            expect({ a: 1, b: 2 }).toMatchSnapshot();
        });
    });

    describe.skip('toMatchFileSnapshot', () => {
        it('should assert that a value matches a stored snapshot in a file', async () => {
            await expect({ a: 1, b: 2 }).toMatchFileSnapshot('snapshot.json');
        });
    });

    describe.skip('toMatchInlineSnapshot', () => {
        it('should assert that a value matches an inline snapshot', () => {
            expect({ a: 1, b: 2 }).toMatchInlineSnapshot();
        });
    });

    describe.skip('toThrowErrorMatchingSnapshot', () => {
        it('should assert that an error matches a stored snapshot', () => {
            expect(() => {
                throw new Error('test error');
            }).toThrowErrorMatchingSnapshot();
        });
    });
});

describe('expectToFail', () => {
    it('should throw an error with a custom message', () => {
        expect(() => expectToFail('custom message')).toThrowError('custom message');
    });

    it('should throw an error with a default message', () => {
        expect(() => expectToFail()).toThrowError();
    });
});

describe('expectToHaveAssertions', () => {
    it('should not throw when assertions are made', () => {
        expectToHaveAssertions();
        expect(true).toBe(true);
    });
});

describe('expectToHaveAssertionTimes', () => {
    it('should not throw when the correct number of assertions are made', () => {
        expectToHaveAssertionTimes(2);
        expect(true).toBe(true);
        expect(false).toBe(false);
    });
});

describe.skip('softExpect', () => {
    it('should not terminate test execution on failure', () => {
        // This would normally throw and stop execution
        softExpect(5).toBe(6);
        // This line should still execute
        expect(true).toBe(true);
    });
});

/* eslint-disable @typescript-eslint/no-unsafe-argument */
describe('matchers', () => {
    describe('matchAny', () => {
        it('should match any value', () => {
            expect(5).toEqual(matchAny(Number));
            expect('hello').toEqual(matchAny(String));
            expect({}).toEqual(matchAny(Object));
        });
    });

    describe('matchAnything', () => {
        it('should match any value', () => {
            expect(5).toEqual(matchAnything());
            expect('hello').toEqual(matchAnything());
            expect({}).toEqual(matchAnything());
        });
    });

    describe('matchArrayContaining', () => {
        it('should match arrays containing specified elements', () => {
            expect([1, 2, 3]).toEqual(matchArrayContaining([1, 2]));
            expect(['a', 'b', 'c']).toEqual(matchArrayContaining(['a']));
        });
    });

    describe('matchCloseTo', () => {
        it('should match numbers close to the expected value', () => {
            expect(0.1 + 0.2).toEqual(matchCloseTo(0.3));
            expect(1.23).toEqual(matchCloseTo(1.2, 1));
        });
    });

    describe('matchObjectContaining', () => {
        it('should match objects containing specified properties', () => {
            expect({ a: 1, b: 2 }).toEqual(matchObjectContaining({ a: 1 }));
        });
    });

    describe('matchStringContaining', () => {
        it('should match strings containing specified substring', () => {
            expect('hello world').toEqual(matchStringContaining('world'));
        });
    });

    describe('matchStringMatching', () => {
        it('should match strings matching specified pattern', () => {
            expect('hello world').toEqual(matchStringMatching(/world/));
        });
    });
});
/* eslint-enable @typescript-eslint/no-unsafe-argument */
