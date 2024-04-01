/**
 * Type matching against both a writable array and a readonly array.
 *
 * @typeParam V The type of each item in the array.
 */
export type AnyArray<V> = Array<V> | ReadonlyArray<V>;

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
 *  type Name = typeof list[number]['name'];    // == "one" | "two" vs string if not using this
 *
 * @typeParam V The type of each item in the array.
 * @returns An identity function that accepts a list and simply returns it.
 */
export function ensureType<V>() {
    return <T extends V>(list: ReadonlyArray<T>) => {
        return list;
    };
}

/**
 * @typeParam V The type of each item in the array.
 * @param list The list to retrieve the first element for.
 * @returns The first item in the list or undefined if the list is empty.
 */
export function first<V>(list: AnyArray<V>) {
    return list.find(() => true);
}

/**
 * Given a list of function, execute each until there is a function that does not return undefined. You should have at
 * least one of the function return something to prevent problems.
 *
 * @typeParam V The type of each item in the list.
 * @param list The list of functions to execute.
 * @returns The return value of the first function to not return an undefined value.
 */
export function firstDefined<V>(list: AnyArray<() => V | undefined>) {
    let result: V = null as V;
    list.some((item) => {
        result = item() as V;
        return result !== undefined;
    });

    return result;
}

/**
 * Given a list of items, remove null and undefined from the list.
 *
 * @param V The type of each item in the list.
 * @param list The list of items to traverse and filter.
 * @returns The given list without null or undefined values.
 */
export function keepOnlyDefined<V>(list: AnyArray<V>) {
    return list.filter((item): item is NonNullable<V> => item !== null && item !== undefined);
}

/**
 * Given a list, convert it to an object where the key will be provided using the given supplier.
 *
 * @typeParam K The type for the key that will be produced for the map.
 * @typeParam V The type of each item in the list.
 * @typeParam V2 The type for the value when it is set to the map.
 * @param list The list of items to convert.
 * @param keySupplier Function to use to generate the key for each entry.
 * @param valueSupplier Function to use to generate the value for each entry.
 * @returns An object representation of the given list using the provided suppliers to generate the keys and values.
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
