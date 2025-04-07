import prettier from 'eslint-config-prettier';
import { flatConfigs } from 'eslint-plugin-import-x';
import type { ConfigWithExtends } from 'typescript-eslint';
import { configs } from 'typescript-eslint';

/**
 * Get the default configurations for `.ts` files.
 */
export function getTsConfigs(jsConfigs: ConfigWithExtends, baseDir: string): ConfigWithExtends {
    return {
        name: '@ti-platform/ts',
        files: ['**/*.ts'],
        extends: [
            // Note that we need to ensure "prettier" is last
            ...jsConfigs.extends!.filter((v) => v !== prettier),
            configs.recommendedTypeChecked,
            configs.stylisticTypeChecked,
            flatConfigs.typescript,
            prettier,
        ],
        plugins: jsConfigs.plugins,
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parserOptions: {
                projectService: true,
                tsconfigRootDir: baseDir,
            },
        },
        rules: {
            ...jsConfigs.rules!,
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
                    fixStyle: 'separate-type-imports',
                },
            ],
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-non-null-assertion': 'off',
            '@typescript-eslint/no-redundant-type-constituents': 'off',
            '@typescript-eslint/no-unused-vars': ['error', { args: 'none', caughtErrorsIgnorePattern: '^ignore' }],
            '@typescript-eslint/only-throw-error': 'off',
            '@typescript-eslint/prefer-function-type': 'off',
            '@typescript-eslint/restrict-template-expressions': 'off',
            '@typescript-eslint/unbound-method': ['error', { ignoreStatic: true }],
        },
    };
}
