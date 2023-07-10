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
