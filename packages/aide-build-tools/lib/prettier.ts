import { Config } from 'prettier';

import { spawnCommand } from './cli';
import { RunEsLintPrettierParams } from './misc';

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

export function runPrettier(params: RunEsLintPrettierParams) {
    const dirExtensionPatterns =
        params.dirs?.length && params.extensions?.length
            ? params.dirs.flatMap((dir) => params.extensions!.map((extension) => `"${dir}/**/*${extension}"`))
            : params.dirs?.length && !params.extensions
            ? params.dirs
            : params.extensions?.length && !params.dirs
            ? params.extensions.map((extension) => `"./*${extension}"`)
            : [];

    return spawnCommand(
        ['./node_modules/.bin/prettier --write', ...dirExtensionPatterns, ...(params.files ?? [])].join(' ')
    );
}
