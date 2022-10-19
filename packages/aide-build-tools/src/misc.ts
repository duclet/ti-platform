import { existsSync } from 'fs';
import { join } from 'path';
import { cwd } from 'process';

export type RunEsLintPrettierParams = {
    dirs?: Array<string>;
    extensions?: Array<string>;
    files?: Array<string>;
};

export const GENERAL_FILES = [
    './.eslintrc.cjs',
    './package.json',
    './prettier.config.cjs',
    './tsconfig.json',
    './tsup.config.ts',
    './vite.config.ts',
];

export function keepOnlyExistentPaths(paths: Array<string>) {
    const workingDir = cwd();
    return paths.filter((file) => existsSync(join(workingDir, file)));
}
