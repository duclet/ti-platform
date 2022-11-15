import { cli } from 'cleye';

import { spawnCommand } from './spawn';

function getArgv(commandName: string) {
    return cli({
        name: commandName,
        flags: {
            baseReadme: {
                alias: 'b',
                description: 'The base file to inject the generated content into.',
                type: [String],
                default: './base-readme.md',
            },
            includeVueDocGen: {
                alias: 'v',
                description: 'Include the generation of vue-docgen-cli.',
                type: [Boolean],
                default: false,
            },
            inputFile: {
                alias: 'i',
                description: 'The input file.',
                type: [String],
                default: './src/index.ts',
            },
            vueDocGenConfigFile: {
                alias: 'c',
                description: 'The path to the configuration file for vue-docgen-cli.',
                type: [String],
                default: './docgen.config.cjs',
            },
            outDir: {
                alias: 'o',
                description: 'Directory to output the generated content.',
                type: [String],
                default: './docs',
            },
        },
    });
}

export function runTypedoc() {
    const argv = getArgv('run-typedoc');

    spawnCommand(
        `pnpm typedoc --out ${argv.flags.outDir} --hideBreadcrumbs --readme ${argv.flags.baseReadme} ${argv.flags.inputFile}`
    );
    spawnCommand(`tail -n +5 ${argv.flags.outDir}/modules.md > ${argv.flags.outDir}/modules-with-header.md`);
    spawnCommand(
        `sed -i -e "/<!-- Insert API Docs -->/r ${argv.flags.outDir}/modules-with-header.md" ${argv.flags.outDir}/README.md`
    );
    spawnCommand(`sed -i -- "s/modules.md/README.md/g" ${argv.flags.outDir}/README.md`);
    spawnCommand(`sed -i -- "s/<!-- Insert API Docs -->//g" ${argv.flags.outDir}/README.md`);

    if (argv.flags.includeVueDocGen) {
        spawnCommand(`pnpm vue-docgen -c ${argv.flags.vueDocGenConfigFile}`);
        spawnCommand(`sed -i 's/# /### /g' ${argv.flags.outDir}/components.md`);
        spawnCommand(
            `sed -i -e "/<!-- Insert Components -->/r ${argv.flags.outDir}/components.md" ${argv.flags.outDir}/README.md`
        );
        spawnCommand(`sed -i -- "s/<!-- Insert Components -->//g" ${argv.flags.outDir}/README.md`);
    }

    spawnCommand(`cp ${argv.flags.outDir}/README.md ./ && rm -rf ${argv.flags.outDir}`);
}
