import type BaseStyle from '@primevue/core/base/style';
import { getCurrentInstance } from 'vue';

/**
 * PrimeVue doesn't have a consistent level of severity/color scheme for their components so we are going to assume one.
 */
export enum ColorOption {
    PRIMARY,
    SECONDARY,
    SUCCESS,
    INFO,
    WARN,
    ERROR,
    CONTRAST,
    HELP,
}

/**
 * Map the given color option to a Badge's severity level.
 *
 * @param colorOption
 *  The color option to map.
 * @returns
 *  The severity for the given color option.
 */
export function getSeverityForBadge(colorOption: ColorOption) {
    switch (colorOption) {
        case ColorOption.HELP:
            return undefined;
        default:
            return getSeverityForButton(colorOption);
    }
}

/**
 * Map the given color option to a Button's severity level.
 *
 * @param colorOption
 *  The color option to map.
 * @returns
 *  The severity for the given color option.
 */
export function getSeverityForButton(colorOption: ColorOption) {
    switch (colorOption) {
        case ColorOption.SECONDARY:
            return 'secondary';
        case ColorOption.SUCCESS:
            return 'success';
        case ColorOption.INFO:
            return 'info';
        case ColorOption.WARN:
            return 'warn';
        case ColorOption.ERROR:
            return 'danger';
        case ColorOption.CONTRAST:
            return 'contrast';
        case ColorOption.HELP:
            return 'help';
        case ColorOption.PRIMARY:
        default:
            return undefined;
    }
}

/**
 * Map the given color option to a Message's severity level.
 *
 * @param colorOption
 *  The color option to map.
 * @returns
 *  The severity for the given color option.
 */
export function getSeverityForMessage(colorOption: ColorOption) {
    switch (colorOption) {
        case ColorOption.ERROR:
            return 'error';
        default:
            return getSeverityForBadge(colorOption);
    }
}

/**
 * Map the given color option to an OverlayBadge's severity level.
 *
 * @param colorOption
 *  The color option to map.
 * @returns
 *  The severity for the given color option.
 */
export function getSeverityForOverlayBadge(colorOption: ColorOption) {
    return getSeverityForBadge(colorOption);
}

/**
 * Map the given color option to a Tag's severity level.
 *
 * @param colorOption
 *  The color option to map.
 * @returns
 *  The severity for the given color option.
 */
export function getSeverityForTag(colorOption: ColorOption) {
    return getSeverityForBadge(colorOption);
}

/**
 * Map the given color option to a SplitButton's severity level.
 *
 * @param colorOption
 *  The color option to map.
 * @returns
 *  The severity for the given color option.
 */
export function getSeverityForSplitButton(colorOption: ColorOption) {
    return getSeverityForButton(colorOption);
}

/**
 * Map the given color option to a Toast's severity level.
 *
 * @param colorOption
 *  The color option to map.
 * @returns
 *  The severity for the given color option.
 */
export function getSeverityForToast(colorOption: ColorOption) {
    return getSeverityForBadge(colorOption);
}

// PrimeVue doesn't expose its entire API, so we are forcing it

type ThemeGenerator = ({ dt }: { dt: (token: string) => string }) => string;

/**
 * Add some type support for defining themes.
 *
 * @param generator
 *  The generator to use to define the theme.
 */
export function defineTheme(generator: ThemeGenerator) {
    return generator;
}

/**
 * Allows extending the BaseStyle for a PrimeVue component.
 *
 * @param parentStyle
 *  The parent style to extend from.
 * @param childStyle
 *  The child extension.
 * @returns
 *  The new class after it has been extended.
 */
export function extendStyle(parentStyle: typeof BaseStyle, childStyle: unknown) {
    return (parentStyle as unknown as { extend: (obj: unknown) => typeof BaseStyle }).extend(childStyle);
}

/**
 * Retrieve the current context and expose the methods that PrimeVue uses to do passthrough functionality.
 */
function getContext() {
    const ctx = getCurrentInstance();
    return ctx!.proxy as unknown as {
        cx: (key: string, params?: object) => object | string;
        ptmi: (key: string, params?: object) => object;
        ptm: (key: string, params?: object) => object;
    };
}

/**
 * Get the helper methods that PrimeVue defines for its components to allow passthrough support.
 */
export function exposePrimeVueHelpers() {
    return {
        cx: (key: string, params?: object) => getContext().cx(key, params),
        ptmi: (key: string, params?: object) => getContext().ptmi(key, params),
        ptm: (key: string, params?: object) => getContext().ptm(key, params),
    };
}
