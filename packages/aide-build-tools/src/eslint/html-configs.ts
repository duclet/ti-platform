import html from '@html-eslint/eslint-plugin';
import prettier from 'eslint-config-prettier/flat';
import type { ConfigWithExtends } from 'typescript-eslint';

/**
 * Get the default configurations for `.html` files.
 */
export function getHtmlConfigs(): ConfigWithExtends {
    return {
        name: '@ti-platform/html',
        files: ['**/*.html'],
        extends: [html.configs['flat/recommended'], prettier],
        rules: {
            // Prettier will take care of this for us so just turn this off
            '@html-eslint/no-extra-spacing-attrs': 'off',
            '@html-eslint/require-closing-tags': 'off',
        },
    };
}
