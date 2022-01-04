import { Nullable } from './types';

/**
 * Given a list of items, remove null and undefined from the list.
 */
export function keepOnlyDefined<T>(list: Array<Nullable<T>>): Array<T> {
    return list.filter((item): item is T => item !== null && item !== undefined);
}
