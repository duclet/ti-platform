/**
 * For a given object, T, mark the keys given as being readonly.
 */
export type MarkReadonly<T, K extends keyof T> = Omit<T, K> & Readonly<Pick<T, K>>;
