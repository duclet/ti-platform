import { Linter } from 'eslint';

import { getHtmlConfigs } from './eslint/html-configs';
import { getCjsConfigs, getJsConfigs } from './eslint/javascript-configs';
import { getJsonConfigs } from './eslint/json-configs';
import { getTsConfigs } from './eslint/typescript-configs';
import { getVueConfigs } from './eslint/vue-configs';
import { RunEsLintPrettierParams } from './misc';
import { spawnCommand } from './spawn';

export type EslintConfigsParams = {
    baseDir: string;
    enable?: Array<'cjs' | 'html' | 'js' | 'json' | 'ts' | 'vue'>;
    configureCjs?: (configs: Linter.ConfigOverride) => Linter.ConfigOverride;
    configureHtml?: (configs: Linter.ConfigOverride) => Linter.ConfigOverride;
    configureJs?: (configs: Linter.ConfigOverride) => Linter.ConfigOverride;
    configureJson?: (configs: Linter.ConfigOverride) => Linter.ConfigOverride;
    configureTs?: (configs: Linter.ConfigOverride) => Linter.ConfigOverride;
    configureVue?: (configs: Linter.ConfigOverride) => Linter.ConfigOverride;
};

/**
 * Given the base configurations, if an extender function is provided, execute it to retrieve the extended
 * configurations.
 */
export function configureWithPossibleExtension(
    baseConfigs: Linter.ConfigOverride,
    extender: (configs: Linter.ConfigOverride) => Linter.ConfigOverride = (x) => x
) {
    return extender(baseConfigs);
}

/**
 * Generate the configurations to use for ESLint.
 *
 * Note the following unique features while the configurations are generated:
 * - Configurations for *.ts files will inherit the plugins and rules set by the *.js configurations.
 * - Configurations for *.vue files will inherit the plugins, and rules set by the *.ts configurations.
 */
export function generateEslintConfigs(configs: EslintConfigsParams) {
    const cjsConfigs = configureWithPossibleExtension(getCjsConfigs(), configs.configureCjs);
    const htmlConfigs = configureWithPossibleExtension(getHtmlConfigs(), configs.configureHtml);
    const jsConfigs = configureWithPossibleExtension(getJsConfigs(), configs.configureJs);
    const jsonConfigs = configureWithPossibleExtension(getJsonConfigs(), configs.configureJson);

    const tsConfigs = configureWithPossibleExtension(getTsConfigs(jsConfigs, configs.baseDir), configs.configureTs);
    const vueConfigs = configureWithPossibleExtension(getVueConfigs(tsConfigs), configs.configureVue);

    return {
        root: true,
        overrides: [
            configs.enable?.includes('cjs') ? cjsConfigs : null,
            configs.enable?.includes('html') ? htmlConfigs : null,
            configs.enable?.includes('js') ? jsConfigs : null,
            configs.enable?.includes('json') ? jsonConfigs : null,
            configs.enable?.includes('ts') ? tsConfigs : null,
            configs.enable?.includes('vue') ? vueConfigs : null,
        ].filter((config) => config !== null),
    };
}

export function runEslint(params: RunEsLintPrettierParams) {
    return spawnCommand(
        [
            'DEBUG=eslint:cli-engine ./node_modules/.bin/eslint --fix',
            ...(params.extensions ?? []).map((extension) => `--ext ${extension}`),
            ...(params.dirs ?? []),
            ...(params.files ?? []),
            ' 2>&1',
        ].join(' ')
    );
}
