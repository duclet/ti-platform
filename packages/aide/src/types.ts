/**
 * For a given object, T, mark the keys given as being readonly.
 */
export type MarkReadonly<T, K extends keyof T> = Omit<T, K> & Readonly<Pick<T, K>>;

/**
 * To allow for guarded maps for simple use cases.
 */
export interface GuardedMap<K, V> extends Map<K, V> {
    has<S extends K>(k: S): this is (K extends S ? Record<string, never> : { get(k: S): V }) & this;
}
