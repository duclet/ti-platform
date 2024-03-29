import { existsSync } from 'fs';
import { join } from 'path';
import { cwd } from 'process';

export type RunEsLintPrettierParams = {
    /**
     * List of directory glob patterns to run the linter on.
     */
    dirs?: Array<string>;

    /**
     * List of file extensions to run the linter on.
     */
    extensions?: Array<string>;

    /**
     * List of files to run the linter on.
     */
    files?: Array<string>;
};

/**
 * General list of files that most packages should have that we want to lint and format.
 */
export const GENERAL_FILES = [
    './.eslintrc.cjs',
    './package.json',
    './prettier.config.cjs',
    './tsconfig.json',
    './tsup.config.ts',
    './vite.config.ts',
];

/**
 * Given a list of paths, remove files that doesn't exists.
 */
export function keepOnlyExistentPaths(paths: Array<string>) {
    const workingDir = cwd();
    return paths.filter((file) => existsSync(join(workingDir, file)));
}

/**
 * Configurations to compare against the page name and returning its chunk name.
 */
export type ChunkNameConfig = {
    /**
     * Used to compare against the package name. Based on the type given, it does different things:
     * - If true, always consider as a match (good for the catch-all case).
     * - If it is a string, see if the package name starts with the value.
     * - If it is a regular expression, see if the package name matches the expression.
     * - If it is a function, execute the function with the full module ID and the package name and its return value is
     *      true.
     */
    matcher: true | string | RegExp | ((moduleId: string, actualPackage: string) => boolean);

    /**
     * When matched, used to determine the name of the chunk. Supports the following:
     * - If it is a string, just use the string as the chunk name.
     * - If it is a function, execute the function with the full module ID and the package name and its return value is
     *      used.
     * - If it is an array of configs, recursively loop into and try to get the chunk name using the sub configs.
     */
    handler: string | ((moduleId: string, actualPackage: string) => string) | Array<ChunkNameConfig>;
};

/**
 * For the given configs and full module ID, return the name for the chunk or undefined if it is not supported. This
 * will only match against imports for packages under node_modules. Should be used by the "manualChunks" function for
 * Rollup.
 *
 * @param configs
 *  Configurations with the pattern to match against and the chunk name to use.
 * @param moduleId
 *  ID of the module to get the chunk name for.
 * @returns
 *  The name of the chunk to use or undefined to let Rollup decides for itself.
 */
export function getChunkName(configs: Array<ChunkNameConfig>, moduleId: string): string | undefined {
    if (!moduleId.includes('/node_modules/')) {
        return;
    }

    const actualPackage = moduleId.split('/node_modules/').reverse().find(Boolean)!.toLowerCase();

    const handler = configs.find((config) => {
        if (typeof config.matcher === 'string' && actualPackage.startsWith(config.matcher)) {
            return true;
        }

        if (config.matcher instanceof RegExp && config.matcher.test(actualPackage)) {
            return true;
        }

        if (typeof config.matcher === 'function' && config.matcher(moduleId, actualPackage)) {
            return true;
        }

        return config.matcher === true;
    })?.handler;

    if (!handler) {
        return;
    }

    if (typeof handler === 'string') {
        return handler;
    }

    if (typeof handler === 'function') {
        return handler(moduleId, actualPackage);
    }

    return getChunkName(handler, moduleId);
}
