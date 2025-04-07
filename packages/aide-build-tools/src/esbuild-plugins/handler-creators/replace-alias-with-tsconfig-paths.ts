import type { ModifySourceContentsChainHandlerCreator } from '@src/esbuild-plugins/modify-source-contents-chain';
import { dirname, relative } from 'path';
import { createMatchPath, loadConfig } from 'tsconfig-paths';

/**
 * Should match against all import statements such as the following:
 *
 * ```
 * import vue from 'vue';
 * import { a } from '@src/a';
 * import { b } from './foo/b';
 * ```
 */
const IMPORT_STATEMENT_REGEXP = /(?<before>(import|export) ((.|\n)*?) from ('|"))(?<import>.+)(?<after>('|");)/gm;

/**
 * This plugin allows the use of path aliases in TSConfig, and it will be replaced with the mapped value in the
 * generated output. This plugin makes use of simple string matching and replace so that it can still be fast. If you
 * want to use a plugin that is likely safer which actually parses the code and does the replacement, you can look at
 * the plugin available here: https://github.com/wjfei/esbuild-plugin-tsconfig-paths
 *
 * @throws Throws a `tsconfig-path#ConfigLoaderFailResult` If we cannot load the `tsconfig.json` file for this package.
 */
export const replaceAliasWithTsconfigPaths: ModifySourceContentsChainHandlerCreator = ({
    build,
    cwd,
    debug,
    extensions,
}) => {
    const configs = loadConfig(cwd);
    if (configs.resultType === 'failed') {
        throw configs;
    }

    const pathMatcher = createMatchPath(
        configs.absoluteBaseUrl,
        configs.paths,
        configs.mainFields,
        configs.addMatchAll
    );

    return ({ contents, path }) => ({
        contents: Array.from(contents.matchAll(IMPORT_STATEMENT_REGEXP)).reduce((result, match) => {
            const aliasedPath = pathMatcher(match.groups!.import, undefined, undefined, extensions);
            if (!aliasedPath) {
                return result;
            }

            const relativePath = relative(dirname(path), aliasedPath);
            const normalizedRelativePath = relativePath.startsWith('.') ? relativePath : `./${relativePath}`;

            if (debug) {
                console.log(`${path}: ${match.groups!.import} => ${normalizedRelativePath}`);
            }

            return result.replaceAll(match[0], match.groups!.before + normalizedRelativePath + match.groups!.after);
        }, contents),
    });
};
