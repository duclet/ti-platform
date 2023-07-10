/**
 * Given a map, return the value with the requested key or the default value if the key does not exists.
 *
 * @param map
 *  The map to get the data from.
 * @param key
 *  The key to get the data for.
 * @param defaultValue
 *  The default value to return if the key does not exist.
 */
export function getOrDefault<K, V, M extends Map<K, V>>(map: M, key: K, defaultValue: V): V {
    return map.get(key) ?? defaultValue;
}

/**
 * Type guards aren't available for map so this method is here to somewhat provides that.
 *
 * @param map
 *  The map to check to see if the key exists.
 * @param key
 *  The key to get the data for.
 * @return
 *  Returns a promise of the value if the key exists or a rejection if it doesn't.
 */
export function mapHas<K, V, M extends Map<K, V>>(map: M, key: K): Promise<V> {
    return map.has(key) ? Promise.resolve(map.get(key)!) : Promise.reject();
}
