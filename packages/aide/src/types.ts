/**
 * For a given object, T, mark the keys given as being readonly.
 */
export type MarkReadonly<T, K extends keyof T> = Omit<T, K> & Readonly<Pick<T, K>>;

/**
 * The type is simply `T` or a promise which, when resolved, is given `T`.
 */
export type Awaitable<T> = T | Promise<T>;
