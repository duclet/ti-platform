import { expect as vitestExpect } from 'vitest';

/**
 * Wrapper around Vitest's expect to allow a fluent API and some more extension.
 */
export class Assertion<T, P = undefined> {
    public constructor(
        private readonly value: T,
        private readonly parentAssertion?: P,
        private readonly options: {
            invert?: boolean;
            soft?: boolean;
        } = {}
    ) {}

    /**
     * Using not will negate the assertion.
     */
    public get not(): Assertion<T, Assertion<T, P>> {
        return new Assertion<T, Assertion<T, P>>(this.value, this, { ...this.options, invert: !this.options.invert });
    }

    /**
     * Create a new assertion by using the given mapper to map the current value to a new one. You would be able to get
     * back to this assertion by calling {@link parent} from the newly created assertion.
     */
    public map<R>(mapper: (value: T) => R): Assertion<R, Assertion<T, P>> {
        return new Assertion<R, Assertion<T, P>>(mapper(this.value), this, { ...this.options });
    }

    /**
     * Get the parent assertion of this assertion, usually from a {@link map} or {@link not} call. Will throw an error
     * if there are no parent assertion.
     */
    public parent(): P {
        if (!this.parentAssertion) {
            throw new Error('No parent assertion exists');
        }

        return this.parentAssertion;
    }

    /**
     * Checks that a value is what you expect. It calls `Object.is` to compare values. Don't use toBe with
     * floating-point numbers.
     */
    public toBe(expected: T): this {
        this.createExpect().toBe(expected);
        return this;
    }

    /**
     * Using exact equality with floating point numbers is a bad idea. Rounding means that intuitive things fail. The
     * default for precision is 2.
     */
    public toBeCloseTo(num: number, numDigits?: number): this;
    public toBeCloseTo(...args: [number, number]): this {
        this.createExpect().toBeCloseTo(...args);
        return this;
    }

    /**
     * Ensure that a variable is not `undefined`.
     */
    public toBeDefined(): this {
        this.createExpect().toBeDefined();
        return this;
    }

    /**
     * Ensures the value is `false`.
     */
    public toBeFalse(): this {
        this.createExpect().toBe(false);
        return this;
    }

    /**
     * When you don't care what a value is, you just want to ensure a value is false in a boolean context.
     */
    public toBeFalsy(): this {
        this.createExpect().toBeFalsy();
        return this;
    }

    /**
     * For comparing floating point numbers.
     */
    public toBeGreaterThan(num: number | bigint): this {
        this.createExpect().toBeGreaterThan(num);
        return this;
    }

    /**
     * For comparing floating point numbers.
     */
    public toBeGreaterThanOrEqual(num: number | bigint): this {
        this.createExpect().toBeGreaterThanOrEqual(num);
        return this;
    }

    /**
     * Ensure that an object is an instance of a class. This matcher uses instanceof underneath.
     */
    public toBeInstanceOf<C>(klass: C): this {
        this.createExpect().toBeInstanceOf(klass);
        return this;
    }

    /**
     * For comparing floating point numbers.
     */
    public toBeLessThan(num: number | bigint): this {
        this.createExpect().toBeLessThan(num);
        return this;
    }

    /**
     * For comparing floating point numbers.
     */
    public toBeLessThanOrEqual(num: number | bigint): this {
        this.createExpect().toBeLessThanOrEqual(num);
        return this;
    }

    /**
     * Used to check that a variable is `NaN`.
     */
    public toBeNaN(): this {
        this.createExpect().toBeNaN();
        return this;
    }

    /**
     * This is the same as `.toBe(null)` but the error messages are a bit nicer. So use `.toBeNull()` when you want to
     * check that something is `null`.
     */
    public toBeNull(): this {
        this.createExpect().toBeNull();
        return this;
    }

    /**
     * Ensures the value is `true`.
     */
    public toBeTrue(): this {
        this.createExpect().toBe(true);
        return this;
    }

    /**
     * Use when you don't care what a value is, you just want to ensure a value is true in a boolean context. In
     * JavaScript, there are six falsy values: `false`, `0`, `''`, `null`, `undefined`, and `NaN`. Everything else is
     * truthy.
     */
    public toBeTruthy(): this {
        this.createExpect().toBeTruthy();
        return this;
    }

    /**
     * Ensures a value is of a specific type.
     */
    public toBeTypeOf(
        type: 'bigint' | 'boolean' | 'function' | 'number' | 'object' | 'string' | 'symbol' | 'undefined'
    ): this {
        this.createExpect().toBeTypeOf(type);
        return this;
    }

    /**
     * Used to check that a variable is `undefined`.
     */
    public toBeUndefined(): this {
        this.createExpect().toBeUndefined();
        return this;
    }

    /**
     * Used when you want to check that an item is in a list. For testing the items in the list, this uses ===, a strict
     * equality check.
     */
    public toContain(item: T): this {
        this.createExpect().toContain(item);
        return this;
    }

    /**
     * Used when you want to check that an item is in a list. For testing the items in the list, this matcher
     * recursively checks the equality of all fields, rather than checking for object identity.
     */
    public toContainEqual(item: T): this {
        this.createExpect().toContainEqual(item);
        return this;
    }

    /**
     * Used when you want to check that two objects have the same value. This matcher recursively checks the equality of
     * all fields, rather than checking for object identity.
     */
    public toEqual(expected: T): this {
        this.createExpect().toEqual(expected);
        return this;
    }

    /**
     * Ensures that a mock function is called.
     */
    public toHaveBeenCalled(): this {
        this.createExpect().toHaveBeenCalled();
        return this;
    }

    /**
     * Asserts that a mock function was called exactly once.
     */
    public toHaveBeenCalledOnce(): this {
        this.createExpect().toHaveBeenCalledOnce();
        return this;
    }

    /**
     * Ensures that a mock function is called an exact number of times.
     */
    public toHaveBeenCalledTimes(times: number): this {
        this.createExpect().toHaveBeenCalledTimes(times);
        return this;
    }

    /**
     * Ensure that a mock function is called with specific arguments.
     */
    public toHaveBeenCalledWith(...args: Array<unknown>): this {
        this.createExpect().toHaveBeenCalledWith(...args);
        return this;
    }

    /**
     * If you have a mock function, you can use `.toHaveBeenLastCalledWith` to test what arguments it was last called
     * with.
     */
    public toHaveBeenLastCalledWith(...args: Array<unknown>): this {
        this.createExpect().toHaveBeenLastCalledWith(...args);
        return this;
    }

    /**
     * Ensure that a mock function is called with specific arguments on an Nth call.
     */
    public toHaveBeenNthCalledWith(time: number, ...args: Array<unknown>): this {
        this.createExpect().toHaveBeenNthCalledWith(time, ...args);
        return this;
    }

    /**
     * Asserts that the last resolved value of a promise matches an expected value.
     */
    public toHaveLastResolvedWith(value: unknown): this {
        this.createExpect().toHaveLastResolvedWith(value);
        return this;
    }

    /**
     * Use to test the specific value that a mock function last returned. If the last call to the mock function threw an
     * error, then this matcher will fail no matter what value you provided as the expected return value.
     */
    public toHaveLastReturnedWith(value: unknown): this {
        this.createExpect().toHaveLastReturnedWith(value);
        return this;
    }

    /**
     * Used to check that an object has a `.length` property and it is set to a certain numeric value.
     */
    public toHaveLength(length: number): this {
        this.createExpect().toHaveLength(length);
        return this;
    }

    /**
     * Ensures a specific value was returned by a promise on the nth resolution.
     */
    public toHaveNthResolvedWith(time: number, value: unknown): this {
        this.createExpect().toHaveNthResolvedWith(time, value);
        return this;
    }

    /**
     * Use to test the specific value that a mock function returned for the nth call. If the nth call to the mock
     * function threw an error, then this matcher will fail no matter what value you provided as the expected return
     * value.
     */
    public toHaveNthReturnedWith(time: number, value: unknown): this {
        this.createExpect().toHaveNthReturnedWith(time, value);
        return this;
    }

    /**
     * Use to check if a property at the specified path exists on an object. For checking deeply nested properties, you
     * may use dot notation or an array containing the path segments for deep references.
     *
     * Optionally, you can provide a value to check if it matches the value present at the path on the target object.
     * This matcher uses 'deep equality' (like {@link toEqual}) and recursively checks the equality of all fields.
     */
    public toHaveProperty(property: string | Array<string | number>, value?: unknown): this;
    public toHaveProperty(...args: [string | Array<string | number>, unknown]): this {
        this.createExpect().toHaveProperty(...args);
        return this;
    }

    /**
     * Checks that a promise resolves successfully at least once.
     */
    public toHaveResolved(): this {
        this.createExpect().toHaveResolved();
        return this;
    }

    /**
     * Use to ensure that a mock function returned successfully (i.e., did not throw an error) an exact number of times.
     * Any calls to the mock function that throw an error are not counted toward the number of times the function
     * returned.
     */
    public toHaveResolvedTimes(times: number): this {
        this.createExpect().toHaveReturnedTimes(times);
        return this;
    }

    /**
     * Checks that a promise resolves to a specific value.
     */
    public toHaveResolvedWith(value: unknown): this {
        this.createExpect().toHaveResolvedWith(value);
        return this;
    }

    /**
     * Use to test that the mock function successfully returned (i.e., did not throw an error) at least one time.
     */
    public toHaveReturned(): this {
        this.createExpect().toHaveReturned();
        return this;
    }

    /**
     * Use to ensure that a mock function returned successfully (i.e., did not throw an error) an exact number of times.
     * Any calls to the mock function that throw an error are not counted toward the number of times the function
     * returned.
     */
    public toHaveReturnedTimes(times: number): this {
        this.createExpect().toHaveReturnedTimes(times);
        return this;
    }

    /**
     * Use to ensure that a mock function returned a specific value.
     */
    public toHaveReturnedWith(value: unknown): this {
        this.createExpect().toHaveReturnedWith(value);
        return this;
    }

    /**
     * Used to check that an object has a `.szie` property and it is set to a certain numeric value.
     */
    public toHaveSize(size: number): this {
        this.createExpect().toHaveProperty('size', size);
        return this;
    }

    /**
     * Check that a string matches a regular expression.
     */
    public toMatch(expected: string | RegExp): this {
        this.createExpect().toMatch(expected);
        return this;
    }

    /**
     * Used to check that a JavaScript object matches a subset of the properties of an object
     */
    public toMatchObject(expected: object | Array<object>): this {
        this.createExpect().toMatchObject(expected);
        return this;
    }

    /**
     * Checks that a value satisfies a custom matcher function.
     */
    public toSatisfy(predicate: (actual: T) => boolean, message?: string): this;
    public toSatisfy(...args: [(actual: T) => boolean, string]): this {
        this.createExpect().toSatisfy(...args);
        return this;
    }

    /**
     * Asserts if value is equal to given or has the same structure if it is an object (compares them recursively), and
     * of the same type.
     *
     * Differences from {@link toEqual}:
     * - Keys with undefined properties are checked. e.g. {a: undefined, b: 2} does not match {b: 2} when using
     *      .toStrictEqual.
     * - Array sparseness is checked. e.g. [, 1] does not match [undefined, 1] when using .toStrictEqual.
     * - Object types are checked to be equal. e.g. A class instance with fields a and b will not equal a literal object
     *      with fields a and b.
     */
    public toStrictEqual(value: T): this {
        this.createExpect().toStrictEqual(value);
        return this;
    }

    /**
     * Asserts if a function throws an error when it is called.
     *
     * You can provide an optional argument to test that a specific error is thrown:
     *  - regular expression: error message matches the pattern
     *  - string: error message includes the substring
     */
    public toThrowError(expected?: unknown): this;
    public toThrowError(...args: [unknown]): this {
        this.createExpect().toThrowError(...(args as [string]));
        return this;
    }

    // Snapshots

    /**
     * This ensures that a value matches the most recent snapshot.
     *
     * You can provide an optional hint string argument that is appended to the test name. Although Vitest always
     * appends a number at the end of a snapshot name, short descriptive hints might be more useful than numbers to
     * differentiate multiple snapshots in a single it or test block. Vitest sorts snapshots by name in the
     * corresponding .snap file.
     */
    public toMatchSnapshot(message?: string): this;
    public toMatchSnapshot(shape: Partial<T>, message?: string): this;
    public toMatchSnapshot(...args: Array<unknown>): this {
        this.createExpect().toMatchSnapshot(...(args as [string]));
        return this;
    }

    /**
     * Compares the received value to a snapshot saved in a specified file. Useful for cases where snapshot content is
     * large or needs to be shared across tests.
     */
    public async toMatchFileSnapshot(filepath: string, message?: string): Promise<this>;
    public async toMatchFileSnapshot(...args: [string, string]): Promise<this> {
        await this.createExpect().toMatchFileSnapshot(...args);
        return this;
    }

    /**
     * This ensures that a value matches the most recent snapshot.
     *
     * Vitest adds and updates the inlineSnapshot string argument to the matcher in the test file (instead of an
     * external .snap file).
     */
    public toMatchInlineSnapshot(message?: string): this;
    public toMatchInlineSnapshot(properties: Partial<T>, snapshot?: string, message?: string): this;
    public toMatchInlineSnapshot(...args: Array<unknown>): this {
        this.createExpect().toMatchInlineSnapshot(...(args as [string]));
        return this;
    }

    /**
     * Checks that an error thrown by a function matches a previously recorded snapshot.
     */
    public toThrowErrorMatchingSnapshot(message?: string): this;
    public toThrowErrorMatchingSnapshot(...args: [string]): this {
        this.createExpect().toThrowErrorMatchingSnapshot(...args);
        return this;
    }

    /**
     * Checks that an error thrown by a function matches an inline snapshot within the test file. Useful for keeping
     * snapshots close to the test code.
     */
    public toThrowErrorMatchingInlineSnapshot(snapshot?: string, message?: string): this;
    public toThrowErrorMatchingInlineSnapshot(...args: [string, string]): this {
        this.createExpect().toThrowErrorMatchingInlineSnapshot(...args);
        return this;
    }

    // Private

    /**
     * Properly create the right expect.
     * @private
     */
    private createExpect() {
        let assertion = this.options.soft ? vitestExpect.soft(this.value) : vitestExpect(this.value);

        if (this.options.invert) {
            assertion = assertion.not;
        }

        return assertion;
    }
}

/**
 * Create a new assertion.
 */
export const expect = <T>(actual: T): Assertion<T> => new Assertion<T>(actual);

/**
 * This method is used to assert that a line should never be reached.
 */
export const expectToFail = (message?: string) => vitestExpect.unreachable(message);

/**
 * After the test has passed or failed verify that at least one assertion was called during a test. A useful case would
 * be to check if an asynchronous code was called.
 *
 * For example, if you have a code that calls a callback, we can make an assertion inside a callback, but the test will
 * always pass if we don't check if an assertion was called.
 */
export const expectToHaveAssertions = () => vitestExpect.hasAssertions();

/**
 * After the test has passed or failed verify that a certain number of assertions was called during a test. A useful
 * case would be to check if an asynchronous code was called.
 *
 * For example, if we have a function that asynchronously calls two matchers, we can assert that they were actually
 * called.
 */
export const expectToHaveAssertionTimes = (times: number) => vitestExpect.assertions(times);

/**
 * This asymmetric matcher, when used with an equality check, will return true only if the value is an instance of a
 * specified constructor. Useful, if you have a value that is generated each time, and you only want to know that it
 * exists with a proper type.
 */
export const matchAny = (klass: unknown) => vitestExpect.any(klass);

/**
 * This asymmetric matcher, when used with equality check, will always return true. Useful, if you just want to be sure
 * that the property exist.
 */
export const matchAnything = () => vitestExpect.anything();

/**
 * Matches if the received array contains all elements in the expected array.
 */
export const matchArrayContaining = (expected: Array<unknown>) => vitestExpect.arrayContaining(expected);

/**
 * Matches if the received number is within a certain precision of the expected number.
 */
export const matchCloseTo = (expected: number, precision?: number) => vitestExpect.closeTo(expected, precision);

/**
 * Matches if the received object contains all properties of the expected object.
 */
export const matchObjectContaining = (expected: unknown) => vitestExpect.objectContaining(expected);

/**
 * Matches if the received string contains the expected substring.
 */
export const matchStringContaining = (expected: string) => vitestExpect.stringContaining(expected);

/**
 * Matches if the received string or regex matches the expected pattern.
 */
export const matchStringMatching = (expected: string | RegExp) => vitestExpect.stringMatching(expected);

/**
 * Functions similarly to {@link expect}, but instead of terminating the test execution upon a failed assertion, it
 * continues running and marks the failure as a test failure. All errors encountered during the test will be displayed
 * until the test is completed.
 */
export const softExpect = <T>(actual: T): Assertion<T> => new Assertion<T>(actual, undefined, { soft: true });
