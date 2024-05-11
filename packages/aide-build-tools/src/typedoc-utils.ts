import { cli } from 'cleye';
import { readFileSync, writeFileSync } from 'fs';

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

/**
 * Execute the command to run TypeDoc (and potentially Vue-DocGen) and insert it into the base read me file.
 */
export async function runTypedoc() {
    const argv = getArgv('run-typedoc');

    spawnCommand(
        `npx typedoc --out ${argv.flags.outDir} --readme ${argv.flags.baseReadme} --excludeInternal --excludePrivate --excludeProtected --pretty --plugin typedoc-plugin-markdown --outputFileStrategy modules --expandObjects true --parametersFormat table --propertiesFormat table --enumMembersFormat table --typeDeclarationFormat table --indexFormat table --hidePageHeader --hidePageTitle ${argv.flags.inputFile}`
    );
    // spawnCommand(`sed -i 's/# /## /g' ${argv.flags.outDir}/globals.md`);
    spawnCommand(`sed -i -e "/---Insert API Docs---/r ${argv.flags.outDir}/globals.md" ${argv.flags.outDir}/README.md`);
    spawnCommand(`sed -i -- "s/globals.md/README.md/g" ${argv.flags.outDir}/README.md`);
    spawnCommand(`sed -i -- "s/---Insert API Docs---//g" ${argv.flags.outDir}/README.md`);

    if (argv.flags.includeVueDocGen) {
        spawnCommand(`npx vue-docgen -c ${argv.flags.vueDocGenConfigFile}`);
        spawnCommand(`sed -i 's/# /### /g' ${argv.flags.outDir}/components.md`);
        spawnCommand(
            `sed -i -e "/---Insert Components---/r ${argv.flags.outDir}/components.md" ${argv.flags.outDir}/README.md`
        );
        spawnCommand(`sed -i -- "s/---Insert Components---//g" ${argv.flags.outDir}/README.md`);
    }

    spawnCommand(`cp ${argv.flags.outDir}/README.md ./ && rm -rf ${argv.flags.outDir}`);

    console.log('Adding TOC');

    const { remark } = await import('remark');
    const { default: remarkToc } = await import('remark-toc');

    const result = remark().use(remarkToc, { maxDepth: 3 }).processSync(readFileSync('./README.md'));
    writeFileSync('./README.md', result.toString());
    console.log('Done.');
}
