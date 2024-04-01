import type { Linter } from 'eslint';

/**
 * Get default configurations for `.vue` files.
 */
export function getVueConfigs(tsConfigs: Linter.ConfigOverride): Linter.ConfigOverride {
    return {
        files: '*.vue',
        extends: [
            // Note that we need to ensure "prettier" is last
            ...(tsConfigs.extends! as Array<string>).filter((v) => v !== 'prettier'),
            ...tsConfigs.extends!.slice(0, -1),
            'plugin:vue/vue3-recommended',
            'prettier',
        ],
        plugins: [...tsConfigs.plugins!, 'vue'],
        parserOptions: {
            ...tsConfigs.parserOptions,
            extraFileExtensions: ['.vue'],
        },
        globals: {
            defineProps: 'readonly',
            defineEmits: 'readonly',
            defineExpose: 'readonly',
            withDefaults: 'readonly',
        },
        rules: {
            ...tsConfigs.rules,
            'vue/multi-word-component-names': 'off',
            'vue/no-v-html': 'off',
        },
    };
}
