import type { ComputedRef, Ref } from 'vue';
import { computed } from 'vue';

/**
 * Shorthand method to simply convert a {@link Ref} to a {@link ComputedRef}.
 *
 * @param ref The {@link Ref} to convert.
 * @returns The {@link ComputedRef} that simply returns the value of the given {@link Ref}.
 */
export function asComputed<T>(ref: Ref<T>): ComputedRef<T> {
    return computed(() => ref.value);
}
