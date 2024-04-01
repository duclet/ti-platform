/**
 * @typeParam K The type of the key in the map.
 * @typeParam V The type of the value in the map.
 * @param map The map to get the data from.
 * @param key The key to get the data for.
 * @param defaultValue The default value to return if the key does not exist.
 * @returns The value in the map with the given key or if the key does not exist, the provided default value.
 */
export function getOrDefault<K, V>(map: Map<K, V>, key: K, defaultValue: V): V {
    return map.get(key) ?? defaultValue;
}
