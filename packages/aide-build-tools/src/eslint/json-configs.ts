import { type Linter } from 'eslint';

/**
 * Get the default configurations for `.json` files.
 */
export function getJsonConfigs(): Linter.ConfigOverride {
    return {
        files: '*.json',
        extends: ['eslint:recommended', 'plugin:json/recommended', 'prettier'],
    };
}
