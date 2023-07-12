import { type HandlerCreator } from '@src/esbuild-plugins/modify-source-contents-chain';

/**
 * Should match against:
 *
 * ```
 * import a from './a';
 * import { b } from '../b';
 * export { c } from './foo/c';
 * export { d as D } from './foo/d';
 * ```
 *
 * It will NOT match against non-relative imports or those with an extension that matches the expected generated
 * extension:
 *
 * ```
 * import vue from 'vue';
 * import { a } from './a.js'; // Assuming the expected generated file should be .js
 * export { b } from './b.mjs'; // Assuming the expected generated file should be .mjs
 * ```
 */
const RELATIVE_IMPORT_STATEMENT_REGEXP =
    /(?<before>(import|export) ((.|\n)*?) from ('|"))(?<import>\.{1,2}\/.+)(?<after>('|");)/gm;

/**
 * This will append the file extension to the end of relative imports if we are building for ESM and CJS.
 */
export const appendFileExtensionForImports: HandlerCreator = ({ build: { initialOptions } }) => {
    if (!['"cjs"', '"esm"'].includes(initialOptions.define?.TSUP_FORMAT ?? '')) {
        return ({ contents, path }) => ({ contents });
    }

    const outExtension = initialOptions.outExtension!['.js'];
    return ({ contents, path }) => ({
        contents: Array.from(contents.matchAll(RELATIVE_IMPORT_STATEMENT_REGEXP)).reduce((result, match) => {
            if (match.groups!.import.includes(outExtension)) {
                return result;
            }

            return result.replaceAll(
                match[0],
                match.groups!.before + match.groups!.import + outExtension + match.groups!.after
            );
        }, contents),
    });
};
