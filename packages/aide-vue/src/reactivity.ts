import { computed, type ComputedRef, type Ref } from 'vue';

/**
 * Shorthand method to simply convert a {@link Ref} to a {@link ComputedRef}.
 *
 * @param ref
 *  The {@link Ref} to convert.
 * @return
 *  The {@link ComputedRef} that simply returns the value of the given {@link Ref}.
 */
export function asComputed<T>(ref: Ref<T>): ComputedRef<T> {
    return computed(() => ref.value);
}
