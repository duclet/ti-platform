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
 * Merge the two types together with the properties from second type overwriting the first.
 */
export type Merge<T, U> = Simplify<Omit<T, keyof U> & U>;

/**
 * For a non-empty array.
 */
export type NonEmptyArray<T> = [T, ...Array<T>];

/**
 * Refer to {@link https://github.com/sindresorhus/type-fest/blob/main/source/simplify.d.ts}.
 */
export type Simplify<T> = { [KeyType in keyof T]: T[KeyType] } & NonNullable<unknown>;

/**
 * Wrapping Simplify over Omit.
 */
export type SimplifyOmit<T, K extends keyof T> = Simplify<Omit<T, K>>;
/**
 * If the given type, `T` is undefined, return `Fallback`, otherwise just return `T.
 */
export type UndefinedFallback<T, Fallback> = [T] extends [undefined] ? Fallback : T;
