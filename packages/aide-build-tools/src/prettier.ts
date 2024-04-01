import type { RunEsLintPrettierParams } from '@src/misc';
import { keepOnlyExistentPaths } from '@src/misc';
import { spawnCommand } from '@src/spawn';
import type { Config } from 'prettier';

/**
 * Get the default configurations for Prettier.
 */
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

/**
 * Execute the command to run Prettier.
 */
export function runPrettier(params: RunEsLintPrettierParams) {
    const dirExtensionPatterns =
        params.dirs?.length && params.extensions?.length
            ? params.dirs.flatMap((dir) => params.extensions!.map((extension) => `"${dir}/**/*${extension}"`))
            : params.dirs?.length && !params.extensions
              ? keepOnlyExistentPaths(params.dirs)
              : params.extensions?.length && !params.dirs
                ? params.extensions.map((extension) => `"./*${extension}"`)
                : [];

    return spawnCommand(
        ['npx prettier --write', ...dirExtensionPatterns, ...keepOnlyExistentPaths(params.files ?? [])].join(' ')
    );
}
