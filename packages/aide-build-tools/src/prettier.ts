import type { RunEsLintPrettierParams } from '@src/misc';
import { keepOnlyExistentPaths } from '@src/misc';
import { spawnCommand } from '@src/spawn';
import { sync as globSync } from 'glob';
import type { Config } from 'prettier';
import { cwd } from 'process';

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
            ? params.dirs.flatMap((dir) => params.extensions!.map((extension) => `${dir}/**/*${extension}`))
            : params.dirs?.length && !params.extensions
              ? keepOnlyExistentPaths(params.dirs)
              : params.extensions?.length && !params.dirs
                ? params.extensions.map((extension) => `./*${extension}`)
                : [];
    const existingDirExtensionPatterns = dirExtensionPatterns
        .filter((pattern) => globSync(pattern, { nodir: true, cwd: cwd() }).length > 0)
        .map((item) => `"${item}"`);

    return spawnCommand(
        [
            'pnpm prettier --cache --cache-strategy content --write',
            ...existingDirExtensionPatterns,
            ...keepOnlyExistentPaths(params.files ?? []),
        ].join(' ')
    );
}
