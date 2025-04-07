import type { Loader, Plugin, PluginBuild } from 'esbuild';
import { readFileSync } from 'fs';
import { cwd as processCwd, env } from 'process';

/**
 * Arguments passed to the {@link ModifySourceContentsChainHandlerCreator} during the build step.
 */
export type ModifySourceContentsChainHandlerCreatorBuildArgs = {
    /**
     * The current working directory. Defaults to whatever value is returned by `process.cwd()`.
     */
    cwd?: string;

    /**
     * Set to true to output some debugging information while executing. Defaults to `false`.
     */
    debug?: boolean;

    /**
     * The list of file extensions to parse. Defaults to `[".ts"]`.
     */
    extensions?: Array<string>;
};

/**
 * Handler to be given the path of the file whose content is also given. It should return an object with the updated
 * contents before it is passed to the next handler.
 */
export type ModifySourceContentsChainHandler = (args: { path: string; contents: string }) => { contents: string };

/**
 * Use to create the handler as part of the build step.
 */
export type ModifySourceContentsChainHandlerCreator = (
    args: ModifySourceContentsChainHandlerCreatorBuildArgs & { build: PluginBuild }
) => ModifySourceContentsChainHandler;

/**
 * Arguments for the function {@link modifySourceContentsChain}.
 */
export type ModifySourceContentsChainArgs = ModifySourceContentsChainHandlerCreatorBuildArgs & {
    /**
     * List of creators for handlers.
     */
    handlerCreators: Array<ModifySourceContentsChainHandlerCreator>;
};

/**
 * Given the path of a file, return the load that should be used to load it.
 */
function filePathToLoader(path: string): Loader {
    if (path.endsWith('.ts')) {
        return 'ts';
    }

    return 'text';
}

/**
 * While esbuild allows you to add multiple handlers for its onLoad event, once one of the handler returns something,
 * the subsequent handlers will not run. That means we can't have multiple handlers that updates the source content.
 * This plugin allows for the possibility.
 */
export function modifySourceContentsChain({
    handlerCreators,
    cwd = processCwd(),
    debug = env.TI_PLATFORM_MODIFY_SOURCE_CONTENTS_CHAIN_DEBUG === 'true' || false,
    extensions = ['.ts'],
}: ModifySourceContentsChainArgs): Plugin {
    return {
        name: '@ti-platform/esbuild-plugin-modify-source-contents-chain',
        setup: (build) => {
            const handlers = handlerCreators.map((handlerCreator) => handlerCreator({ cwd, debug, extensions, build }));

            build.onLoad(
                {
                    filter: new RegExp(`.+(${extensions.join('|').replaceAll('.', '\\.')})`),
                    namespace: 'file',
                },
                ({ path }) => {
                    return {
                        loader: filePathToLoader(path),
                        contents: handlers.reduce(
                            (contents, handler) => handler({ contents, path }).contents,
                            readFileSync(path, 'utf-8')
                        ),
                    };
                }
            );
        },
    };
}
