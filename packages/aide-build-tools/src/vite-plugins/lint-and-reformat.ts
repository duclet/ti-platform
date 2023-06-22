import { debounce } from 'ts-debounce';
import { type Plugin } from 'vite';

import { runEslint } from '../eslint';
import { GENERAL_FILES } from '../misc';
import { runPrettier } from '../prettier';
import { spawnCommand } from '../spawn';

function runVerifyTs() {
    return spawnCommand('./node_modules/.bin/tsc --noEmit --listFiles | grep -v node_modules');
}

function runVerifyVueTs() {
    return spawnCommand('./node_modules/.bin/vue-tsc --noEmit --listFiles | grep -v node_modules');
}

/**
 * Hot updates and watch changes will be called once for every file update. Since we want to lint and fix files, having
 * it run each time isn't very performant. As such, what we will do is basically queue up files that were updated while
 * letting hot updates just update the file in the browser. When there are no more files that are being updated, then
 * we'll lint and fix the files.
 */
function createWatchHandler({ verifyTs, verifyVueTs }: { verifyTs?: boolean; verifyVueTs?: boolean }) {
    let isAcceptingFile = true;
    let updatedFiles: Array<string> = [];

    return {
        addFile: (file: string) => {
            if (!isAcceptingFile) {
                return;
            }

            updatedFiles.push(`.${file}`);
        },
        executeTasks: debounce(() => {
            if (updatedFiles.length < 1) {
                return;
            }

            isAcceptingFile = false;

            runEslint({ files: updatedFiles });
            runPrettier({ files: updatedFiles });

            if (verifyTs) {
                runVerifyTs();
            }
            if (verifyVueTs) {
                runVerifyVueTs();
            }

            updatedFiles = [];
            setTimeout(() => (isAcceptingFile = true), 1000);
        }, 1000),
    };
}

export function lintAndReformat(
    dirs: Array<string>,
    extensions: Array<string>,
    files: Array<string> = GENERAL_FILES,
    options: {
        verifyTs?: boolean;
        verifyVueTs?: boolean;
    } = {}
): Plugin {
    const rootDir = process.cwd();
    const isEnabled = !process.env['DISABLE_LINTING'];
    const watchHandler = createWatchHandler({ ...options });
    let isInitialBuild = true;

    return {
        name: 'crm-platform:lint-and-reformat',
        enforce: 'pre',
        buildStart() {
            // Rollup will actually call this on each watch change so we don't want to lint after the initial build
            if (!isEnabled || !isInitialBuild) {
                return;
            }

            isInitialBuild = false;

            const eslint = runEslint({ dirs, extensions, files });

            if (eslint.status !== 0) {
                process.exit(1);
            }

            const prettier = runPrettier({ dirs, extensions, files });
            if (prettier.status !== 0) {
                process.exit(1);
            }

            if (options.verifyTs) {
                const verifyTs = runVerifyTs();
                if (verifyTs.status !== 0) {
                    process.exit(1);
                }
            }

            if (options.verifyVueTs) {
                const verifyVueTs = runVerifyVueTs();
                if (verifyVueTs.status !== 0) {
                    process.exit(1);
                }
            }
        },
        handleHotUpdate(ctx) {
            if (!isEnabled) {
                return;
            }

            watchHandler.addFile(ctx.file.substring(rootDir.length));
            void watchHandler.executeTasks();
        },
        watchChange(id, change) {
            if (!isEnabled || change.event === 'delete') {
                return;
            }

            watchHandler.addFile(id.substring(rootDir.length));
            void watchHandler.executeTasks();
        },
    };
}
