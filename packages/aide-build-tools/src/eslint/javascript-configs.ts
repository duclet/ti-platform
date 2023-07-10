import { type Linter } from 'eslint';

/**
 * Shared rules for `.cjs` and `.js` files.
 */
export const BASE_JAVASCRIPT_RULES: Partial<Linter.RulesRecord> = {
    'no-case-declarations': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
};

/**
 * Get the default configurations for `.cjs` files.
 */
export function getCjsConfigs(): Linter.ConfigOverride {
    return {
        files: '*.cjs',
        extends: ['eslint:recommended', 'prettier'],
        env: {
            commonjs: true,
            es6: true,
            node: true,
        },
        rules: {
            ...BASE_JAVASCRIPT_RULES,
            'sort-imports': 'error',
        },
    };
}

/**
 * Get the default configurations for `.js` files.
 */
export function getJsConfigs(): Linter.ConfigOverride {
    return {
        files: '*.js',
        extends: ['eslint:recommended', 'prettier'],
        plugins: ['simple-import-sort'],
        rules: {
            ...BASE_JAVASCRIPT_RULES,
            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',
        },
    };
}
