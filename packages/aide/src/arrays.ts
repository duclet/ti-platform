/**
 * Retrieve the first element of a list.
 *
 * @param list
 *  The list to retrieve the first element for.
 */
export function first<T>(list: Readonly<Array<T>>) {
    return list.find(() => true);
}

/**
 * Given a list of items, remove null and undefined from the list.
 *
 * @param list
 *  The list of items to traverse and filter.
 */
export function keepOnlyDefined<T>(list: Readonly<Array<T>>) {
    return list.filter((item): item is NonNullable<T> => item !== null && item !== undefined);
}
