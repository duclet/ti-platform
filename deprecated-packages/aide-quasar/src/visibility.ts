import type { ComputedRef, Ref } from 'vue';
import { computed } from 'vue';

/**
 * For configuring the visibility of elements.
 */
export enum VisibilityState {
    /**
     * The element should be visible.
     */
    VISIBLE,

    /**
     * The element should be hidden but the HTML for it should still be on the page while keeping the space it occupies
     * visible. Usually, this is done with "visibility: hidden" or "opacity: 0".
     */
    HIDDEN_KEEP_DIMENSIONS,

    /**
     * The element should be hidden but the HTML for it should still be on the page but the element is collapsed.
     * Usually, this is done with "display: none".
     */
    HIDDEN_HIDE_DIMENSIONS,

    /**
     * The element should not be rendered at all. Usually this is done using the `v-if` directive.
     */
    NO_RENDER,
}

/**
 * Get a computed style definition based on the provided visibility state. This is not intended for the NO_RENDER state
 * as that should be handled via the `v-if` directive. It is best to use this in combination with the
 * `vIfByVisibilityState` method.
 *
 * @param state A reactive variable for the current visibility state to calculate the style.
 */
export function cssStyleByVisibilityState(state: Ref<VisibilityState>): ComputedRef<string> {
    return computed(() =>
        state.value === VisibilityState.HIDDEN_KEEP_DIMENSIONS
            ? 'visibility: hidden !important; opacity: 0 !important;'
            : state.value === VisibilityState.HIDDEN_HIDE_DIMENSIONS
              ? 'display: none !important;'
              : ''
    );
}

/**
 * Determine whether an element or component should be visible for use with the `v-if` directive. This should really be
 * used in combination with `cssStyleByVisibilityState` method which handles all the other use cases as this really just
 * handles the NO_RENDER state.
 *
 * @param state A reactive variable for the current visibility state to calculate value for the `v-if` directive.
 */
export function vIfByVisibilityState(state: Ref<VisibilityState>): ComputedRef<boolean> {
    return computed(() => state.value !== VisibilityState.NO_RENDER);
}
