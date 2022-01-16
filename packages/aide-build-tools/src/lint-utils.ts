import chokidar from 'chokidar';
import { cli } from 'cleye';
import { existsSync } from 'fs';
import { join } from 'path';
import { cwd, exit } from 'process';

import { runEslint } from './eslint';
import { GENERAL_FILES } from './misc';
import { runPrettier } from './prettier';
import { spawnCommand } from './spawn';

function getArgv(commandName: string) {
    return cli({
        name: commandName,
        flags: {
            dir: {
                alias: 'd',
                description: 'Directory to scan',
                type: [String],
            },
            extension: {
                alias: 'e',
                description: 'Extension to scan. Ex: .ts',
                type: [String],
            },
            file: {
                alias: 'f',
                description: 'File to include. Ex: ./my-file.ts',
                type: [String],
            },

            includeGeneralFiles: {
                alias: 'g',
                description:
                    'Include some of the general files like package.json, prettier.config.cjs, etc when linting',
                type: Boolean,
                default: false,
            },
            killOnError: {
                alias: 'k',
                description: 'Kill the process when a linter fails rather than continuing on initial run',
                type: Boolean,
                default: false,
            },
            watch: {
                alias: 'w',
                description: 'Enable watch mode',
                type: Boolean,
                default: false,
            },

            command: {
                alias: 'c',
                description: 'Optional list of commands to run after linting is complete',
                type: [String],
            },
        },
    });
}

function getExtraFiles(includeExtraFiles: boolean) {
    const extraFiles: Array<string> = [];
    if (includeExtraFiles) {
        const workingDir = cwd();
        GENERAL_FILES.filter((file) => existsSync(join(workingDir, file))).forEach((file) => extraFiles.push(file));
    }

    return extraFiles;
}

function getWatchPatterns(dirs: Array<string>, extensions: Array<string>, files: Array<string>) {
    const dirExtensionPatterns =
        dirs.length && extensions.length
            ? dirs.flatMap((dir) => extensions.map((extension) => `${dir}/**/*${extension}`))
            : dirs.length && !extensions.length
            ? dirs
            : extensions.length && !dirs.length
            ? extensions.map((extension) => `./*${extension}`)
            : [];

    return [...dirExtensionPatterns, ...files];
}

export function runLinter(name: string, linter: typeof runEslint | typeof runPrettier) {
    const argv = getArgv(name);

    const files = [...argv.flags.file, ...getExtraFiles(argv.flags.includeGeneralFiles)];

    function lintAllFiles() {
        return linter({
            files,
            dirs: argv.flags.dir,
            extensions: argv.flags.extension,
        });
    }

    const result = lintAllFiles();
    if (argv.flags.killOnError && result.status !== 0) {
        exit(1);
    }

    if (argv.flags.command) {
        argv.flags.command.forEach(spawnCommand);
    }

    if (argv.flags.watch) {
        const watcher = chokidar.watch(getWatchPatterns(argv.flags.dir, argv.flags.extension, files), {
            cwd: cwd(),
            ignoreInitial: true,
        });

        const recentFiles: Record<string, Date> = {};

        watcher
            .on('ready', () => console.log('Watching for file changes'))
            .on('all', (eventName, path, stats) => {
                if (recentFiles[path]) {
                    delete recentFiles[path];
                    return;
                }

                if (['add', 'change'].includes(eventName)) {
                    linter({ files: [`./${path}`] });
                }

                if (['unlink', 'unlinkDir'].includes(eventName)) {
                    lintAllFiles();
                }

                if ('addDir' === eventName) {
                    linter({ dirs: [`./${path}`], extensions: argv.flags.extension });
                }

                if (argv.flags.command) {
                    argv.flags.command.forEach(spawnCommand);
                }

                setTimeout(() => {
                    delete recentFiles[path];
                }, 500);

                recentFiles[path] = new Date();
            });
    }
}
