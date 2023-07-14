import { type Linter } from 'eslint';
import { resolve } from 'path';

/**
 * Get the default configurations for `.ts` files.
 */
export function getTsConfigs(jsConfigs: Linter.ConfigOverride, baseDir: string): Linter.ConfigOverride {
    return {
        files: '*.ts',
        extends: [
            // Note that we need to ensure "prettier" is last
            ...(jsConfigs.extends! as Array<string>).filter((v) => v !== 'prettier'),
            'plugin:@typescript-eslint/recommended-type-checked',
            'plugin:@typescript-eslint/stylistic-type-checked',
            'prettier',
        ],
        plugins: [...jsConfigs.plugins!, '@typescript-eslint'],
        parserOptions: {
            parser: '@typescript-eslint/parser',
            project: resolve(baseDir, './tsconfig.json'),
            tsconfigRootDir: baseDir,
            ecmaVersion: 2018,
            sourceType: 'module',
        },
        rules: {
            ...jsConfigs.rules,
            '@typescript-eslint/array-type': ['error', { default: 'generic' }],
            '@typescript-eslint/consistent-generic-constructors': ['error', 'constructor'],
            '@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
            '@typescript-eslint/consistent-type-assertions': [
                'error',
                { assertionStyle: 'as', objectLiteralTypeAssertions: 'allow-as-parameter' },
            ],
            '@typescript-eslint/consistent-type-definitions': 'off',
            '@typescript-eslint/consistent-type-exports': [
                'error',
                {
                    fixMixedExportsWithInlineTypeSpecifier: true,
                },
            ],
            '@typescript-eslint/consistent-type-imports': [
                'error',
                {
                    prefer: 'type-imports',
                    fixStyle: 'inline-type-imports',
                },
            ],
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-non-null-assertion': 'off',
            '@typescript-eslint/no-redundant-type-constituents': 'off',
            '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],
            '@typescript-eslint/prefer-function-type': 'off',
            '@typescript-eslint/restrict-template-expressions': 'off',
            '@typescript-eslint/unbound-method': ['error', { ignoreStatic: true }],
        },
    };
}
