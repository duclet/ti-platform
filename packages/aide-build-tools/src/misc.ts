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
    './vite.config.ts',
];
