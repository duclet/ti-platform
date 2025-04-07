import json from '@eslint/json';
import prettier from 'eslint-config-prettier/flat';
import type { ConfigWithExtends } from 'typescript-eslint';

/**
 * Get the default configurations for `.json` files.
 */
export function getJsonConfigs(): ConfigWithExtends {
    return {
        name: '@ti-platform/json',
        files: ['**/*.json'],
        extends: [json.configs.recommended, prettier],
        language: 'json/json',
    };
}
