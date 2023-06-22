import { type Linter } from 'eslint';

export const BASE_JAVASCRIPT_RULES: Partial<Linter.RulesRecord> = {
    'no-case-declarations': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
};

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
