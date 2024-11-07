/**
 * The type is simply `T` or a promise which, when resolved, is given `T`.
 */
export type Awaitable<T> = T | Promise<T>;

/**
 * Type matching against both a writable array and a readonly array.
 *
 * @typeParam V The type of each item in the array.
 */
export type AnyArray<V> = Array<V> | ReadonlyArray<V>;

/**
 * For a given object, T, mark the keys given as being readonly.
 */
export type MarkReadonly<T, K extends keyof T> = Omit<T, K> & Readonly<Pick<T, K>>;

/**
 * For a non-empty array.
 */
export type NonEmptyArray<T> = [T, ...Array<T>];

/**
 * Refer to {@link https://github.com/sindresorhus/type-fest/blob/main/source/simplify.d.ts}.
 */
export type Simplify<T> = { [KeyType in keyof T]: T[KeyType] } & NonNullable<unknown>;

/**
 * If the given type, `T` is undefined, return `Fallback`, otherwise just return `T.
 */
export type UndefinedFallback<T, Fallback> = [T] extends [undefined] ? Fallback : T;

/**
 * Represents an operation that accepts an input argument and returns no result.
 */
export type ConsumerFn<T> = (input: T) => void;

/**
 * Represents a function that accepts an input argument and produces a result.
 */
export type MapperFn<T, R> = (input: T) => R;

/**
 * Represents a predicate (boolean-valued function) of one argument.
 */
export type PredicateFn<T> = (input: T) => boolean;

/**
 * Represents an operation that does not return a result.
 */
export type Runnable = () => void;

/**
 * Represents a supplier of results.
 */
export type SupplierFn<T> = () => T;
