import { Linter } from 'eslint';

export function getVueConfigs(tsConfigs: Linter.ConfigOverride): Linter.ConfigOverride {
    return {
        files: '*.vue',
        extends: [...tsConfigs.extends!.slice(0, -1), 'plugin:vue/vue3-recommended', ...tsConfigs.extends!.slice(-1)],
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
