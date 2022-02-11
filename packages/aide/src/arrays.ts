type AnyArray<V> = Array<V> | ReadonlyArray<V>;

/**
 * This function is primarily here to help with stricter typing. When Typescript allows for partial inference of
 * arguments to functions, this function would likely not be needed anymore.
 *
 * @example
 *  type MyItem = { name: string, displayName: string };
 *  const list = ensureType<MyItem>()([
 *      { name: 'one', displayName: 'ONE' },    // <- You get proper linting and hinting support here
 *      { name: 'two', displayName: 'TWO' },
 *  ] as const); // <- The "as const" allows for better type restrictions as below
 *
 *  tyoe Name = typeof list[number]['name'];    // == "one" | "two" vs string if not using this
 */
export function ensureType<V>() {
    return <T extends V>(list: ReadonlyArray<T>) => {
        return list;
    };
}

/**
 * Retrieve the first element of a list.
 *
 * @param list
 *  The list to retrieve the first element for.
 */
export function first<V>(list: AnyArray<V>) {
    return list.find(() => true);
}

/**
 * Given a list of items, remove null and undefined from the list.
 *
 * @param list
 *  The list of items to traverse and filter.
 */
export function keepOnlyDefined<V>(list: AnyArray<V>) {
    return list.filter((item): item is NonNullable<V> => item !== null && item !== undefined);
}

/**
 * Given a list, convert it to a map where the key will be provided using the given supplier.
 *
 * @param list
 *  The list of items to convert.
 * @param keySupplier
 *  Function to use to generate the key for each entry.
 * @param valueSupplier
 *  Function to use to generate the value for each entry.
 */
export function toMap<K extends PropertyKey, V, V2>(
    list: AnyArray<V>,
    keySupplier: (item: V, index: number) => K,
    valueSupplier: (item: V, key: K, index: number) => V2
) {
    return Object.fromEntries(
        list.map((item: V, index: number) => {
            const key = keySupplier(item, index);
            const value = valueSupplier(item, key, index);
            return [key, value];
        })
    ) as Record<K, V2>;
}
