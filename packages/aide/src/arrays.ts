import { BiMapper, Supplier, TriMapper } from '@src/function';
import { createOptional, Optional } from '@src/optional';
import type { AnyArray } from '@src/types';

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
 * Retrieve the first value in the given list or undefined if it is empty.
 */
export function first<V>(list: AnyArray<V>): V | undefined {
    return list.find(() => true);
}

/**
 * Same as {@link first} except this returns an {@link Optional}.
 */
export function firstOpt<V>(list: AnyArray<V>): Optional<V> {
    return createOptional(first(list));
}

/**
 * Execute the functions in the list and return the value of the first supplier that return a defined value.
 */
export function firstDefined<V>(list: AnyArray<Supplier<V | undefined>>): V | undefined {
    return firstDefinedOpt(list.map((fn: Supplier<V | undefined>) => () => createOptional(fn()))).orUndefined();
}

/**
 * Same as {@link firstDefined} except both the supplier and the return value of this should be an {@link Optional}.
 */
export function firstDefinedOpt<V>(list: AnyArray<Supplier<Optional<V>>>): Optional<V> {
    let result: Optional<V> = createOptional();
    list.some((item) => {
        result = item();
        return result.isPresent();
    });

    return result;
}

/**
 * Given a list of items, remove null and undefined from the list.
 */
export function keepOnlyDefined<V>(list: AnyArray<V>): Array<NonNullable<V>> {
    return list.filter((item) => item !== null && item !== undefined) as Array<NonNullable<V>>;
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
    keySupplier: BiMapper<V, number, K>,
    valueSupplier: TriMapper<V, K, number, V2>
): Record<K, V2> {
    return Object.fromEntries(
        list.map((item: V, index: number) => {
            const key = keySupplier(item, index);
            const value = valueSupplier(item, key, index);
            return [key, value];
        })
    ) as Record<K, V2>;
}
