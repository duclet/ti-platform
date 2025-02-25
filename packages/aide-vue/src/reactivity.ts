import { computed, ComputedRef, inject, InjectionKey, provide, reactive, Ref, toRef, toRefs } from 'vue';

/**
 * Shorthand method to simply convert a Ref to a ComputedRef.
 *
 * @param ref The Ref to convert.
 * @returns The ComputedRef that simply returns the value of the given Ref.
 */
export function asComputed<T>(ref: Ref<T>): ComputedRef<T> {
    return computed(() => ref.value);
}

/**
 * Basically remove the "UnwrapSimpleRef" from the inner type so things work better with arrays and objects.
 *
 * @param value The value for the ref.
 * @returns The ref.
 */
export function asRef<T>(value: T): Ref<T> {
    return toRef(value) as Ref<T>;
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
