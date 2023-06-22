import { type Linter } from 'eslint';

export function getHtmlConfigs(): Linter.ConfigOverride {
    return {
        files: '*.html',
        extends: ['eslint:recommended', 'plugin:@html-eslint/recommended', 'prettier'],
        parser: '@html-eslint/parser',
        plugins: ['@html-eslint'],
        rules: {
            // Prettier will take care of this for us so just turn this off
            '@html-eslint/no-extra-spacing-attrs': 'off',
            '@html-eslint/require-closing-tags': 'off',
        },
    };
}
