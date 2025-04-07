import eslint from '@eslint/js';
import type { Linter } from 'eslint';
import prettier from 'eslint-config-prettier/flat';
import { flatConfigs } from 'eslint-plugin-import-x';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import type { ConfigWithExtends } from 'typescript-eslint';

/**
 * Shared rules for `.cjs` and `.js` files.
 */
export const BASE_JAVASCRIPT_RULES: Partial<Linter.RulesRecord> = {
    'no-case-declarations': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
};

/**
 * ESLint configurations for CommonJS files.
 */
export function getCjsConfigs(): ConfigWithExtends {
    return {
        name: '@ti-platform/cjs',
        files: ['**/*.cjs'],
        extends: [eslint.configs.recommended, prettier],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.node,
                ...globals.commonjs,
            },
        },
        rules: {
            ...BASE_JAVASCRIPT_RULES,
            'sort-imports': 'error',
        },
    };
}

/**
 * ESLint confgurations for JavaScript files.
 */
export function getJsConfigs(): ConfigWithExtends {
    return {
        name: '@ti-platform/js',
        files: ['**/*.mjs', '**/*.js'],
        extends: [eslint.configs.recommended, flatConfigs.recommended, prettier],
        plugins: { 'simple-import-sort': simpleImportSort },
        rules: {
            ...BASE_JAVASCRIPT_RULES,
            'import-x/no-duplicates': 'error',
            'import-x/no-named-as-default': 'off',
            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',
        },
    };
}
