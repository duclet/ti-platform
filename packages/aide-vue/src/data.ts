import type { InjectionKey } from 'vue';
import { inject, provide, reactive, toRefs } from 'vue';

/**
 * Inject the data from the provided key (we are assuming the data exists) and return the results as refs.
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
