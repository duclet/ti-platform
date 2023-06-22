import { type Linter } from 'eslint';

export function getJsonConfigs(): Linter.ConfigOverride {
    return {
        files: '*.json',
        extends: ['eslint:recommended', 'plugin:json/recommended', 'prettier'],
    };
}
