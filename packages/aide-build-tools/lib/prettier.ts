import { Config } from 'prettier';

export function generatePrettierConfigs(): Config {
    return {
        arrowParens: 'always',
        bracketSpacing: true,
        endOfLine: 'lf',
        printWidth: 120,
        quoteProps: 'consistent',
        semi: true,
        singleQuote: true,
        tabWidth: 4,
        trailingComma: 'es5',
        vueIndentScriptAndStyle: true,
    };
}
