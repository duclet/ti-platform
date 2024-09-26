import type { ComputedRef, InjectionKey, Ref } from 'vue';
import { computed, inject, provide, reactive, toRefs } from 'vue';

/**
 * Shorthand method to simply convert a {@link Ref} to a {@link ComputedRef}.
 *
 * @param ref The {@link Ref} to convert.
 * @returns The {@link ComputedRef} that simply returns the value of the given {@link Ref}.
 */
export function asComputed<T>(ref: Ref<T>): ComputedRef<T> {
    return computed(() => ref.value);
}

/**
 * Inject the data from the provided key (we are assuming the data exists) but return the results as refs.
 *
 * @param key
 *  The key to retrieve the data to inject.
 */
export function injectRefs<T>(key: InjectionKey<T>) {
    return toRefs(inject(key)!);
}

/**
 * Provide the given data to child components and return the data as refs.
 *
 * @param key
 *  The key to store the data as.
 * @param data
 *  The data to store.
 */
export function provideAndReturnRefs<T extends object>(key: InjectionKey<T>, data: T) {
    const reactiveData = reactive(data);

    provide(key, reactiveData as T);
    return toRefs(reactiveData);
}
