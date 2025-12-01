import eslintReact from '@eslint-react/eslint-plugin';
import prettier from 'eslint-config-prettier';
import type { ConfigWithExtends } from 'typescript-eslint';

/**
 * Get default configurations for `.tsx` files.
 */
export function getReactConfigs(tsConfigs: ConfigWithExtends): ConfigWithExtends {
    return {
        name: '@ti-platform/react',
        files: ['**/*.tsx'],
        extends: [
            // Note that we need to ensure "prettier" is last
            ...tsConfigs.extends!.filter((v) => v !== prettier),
            eslintReact.configs['recommended-type-checked'],
            prettier,
        ],
        plugins: tsConfigs.plugins,
        languageOptions: tsConfigs.languageOptions,
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            ...tsConfigs.rules,
        },
    };
}
