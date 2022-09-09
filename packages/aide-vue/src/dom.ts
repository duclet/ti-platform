import { computed, ComputedRef, Ref, ref } from 'vue';

export type ElementOrComponentWithEl = HTMLElement | { $el: HTMLElement };
export type RecomputableRef<T> = ComputedRef<T> & { recompute: () => void };
export type HeightCalcResult = RecomputableRef<string>;

/**
 * In cases where we have an element where any of the height CSS styles is using the "calc" function, we may want to
 * subtract from a base height the current height of some elements, this function allows for that.
 *
 * @param baseHeight
 *  The base height to essentially subtract from. Ex: 90vh, 800px, 100%
 * @param elements
 *  The list of elements or components with a singular root element whose height we will subtract from.
 */
export function useHeightCalc(baseHeight: string, elements: Array<Ref<ElementOrComponentWithEl>>) {
    const counter = ref(1);
    const model = computed(() => {
        // This check here is purely cosmetic to allow force updating
        if (counter.value < 1) {
            return '';
        }

        const heights = [baseHeight];

        elements.forEach((element) => {
            if (!element.value) {
                return;
            }

            const htmlElement = element.value instanceof HTMLElement ? element.value : element.value.$el;
            if (!htmlElement.offsetHeight) {
                return;
            }

            heights.push(`${htmlElement.offsetHeight}px`);
        });

        return `calc(${heights.join(' - ')})`;
    });

    (model as HeightCalcResult).recompute = () => counter.value++;

    return model as HeightCalcResult;
}
