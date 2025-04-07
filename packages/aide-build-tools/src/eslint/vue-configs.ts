import { defu } from 'defu';
import prettier from 'eslint-config-prettier';
import vue from 'eslint-plugin-vue';
import type { ConfigWithExtends } from 'typescript-eslint';
import { parser } from 'typescript-eslint';

/**
 * Get default configurations for `.vue` files.
 */
export function getVueConfigs(tsConfigs: ConfigWithExtends): ConfigWithExtends {
    return {
        name: '@ti-platform/vue',
        files: ['**/*.vue'],
        extends: [
            // Note that we need to ensure "prettier" is last
            ...tsConfigs.extends!.filter((v) => v !== prettier),
            vue.configs['flat/recommended'],
            prettier,
        ],
        plugins: tsConfigs.plugins,
        languageOptions: defu(
            {
                parserOptions: {
                    parser,
                    extraFileExtensions: ['.vue'],
                },
                globals: {
                    defineProps: true,
                    defineEmits: true,
                    defineExpose: true,
                    withDefaults: true,
                },
            },
            tsConfigs.languageOptions
        ),
        rules: {
            ...tsConfigs.rules,
            'vue/multi-word-component-names': 'off',
            'vue/no-v-html': 'off',
        },
    };
}
