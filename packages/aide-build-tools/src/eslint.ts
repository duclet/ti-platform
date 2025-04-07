import { getHtmlConfigs } from '@src/eslint/html-configs';
import { getCjsConfigs, getJsConfigs } from '@src/eslint/javascript-configs';
import { getJsonConfigs } from '@src/eslint/json-configs';
import { getTsConfigs } from '@src/eslint/typescript-configs';
import { getVueConfigs } from '@src/eslint/vue-configs';
import type { RunEsLintPrettierParams } from '@src/misc';
import { keepOnlyExistentPaths } from '@src/misc';
import { spawnCommand } from '@src/spawn';
import type { ConfigArray, ConfigWithExtends } from 'typescript-eslint';
import { config } from 'typescript-eslint';

export * from '@src/eslint/html-configs';
export * from '@src/eslint/javascript-configs';
export * from '@src/eslint/json-configs';
export * from '@src/eslint/typescript-configs';
export * from '@src/eslint/vue-configs';

/**
 * The supported configuration types for ESLint.
 */
export type EslintConfigType = 'cjs' | 'html' | 'js' | 'json' | 'ts' | 'vue';

export type EslintConfigsParams = {
    /**
     * The base directory for your package.
     */
    baseDir: string;

    /**
     * List of files to enable linting support for.
     */
    enable?: Array<EslintConfigType>;

    /**
     * If we need to override or extend the configurations for `.cjs` files, this handler can be provided.
     */
    configureCjs?: (configs: ConfigWithExtends) => ConfigWithExtends;

    /**
     * If we need to override or extend the configurations for `.html` files, this handler can be provided.
     */
    configureHtml?: (configs: ConfigWithExtends) => ConfigWithExtends;

    /**
     * If we need to override or extend the configurations for `.js` files, this handler can be provided.
     */
    configureJs?: (configs: ConfigWithExtends) => ConfigWithExtends;

    /**
     * If we need to override or extend the configurations for `.json` files, this handler can be provided.
     */
    configureJson?: (configs: ConfigWithExtends) => ConfigWithExtends;

    /**
     * If we need to override or extend the configurations for `.ts` and `.cts` files, this handler can be provided.
     */
    configureTs?: (configs: ConfigWithExtends) => ConfigWithExtends;

    /**
     * If we need to override or extend the configurations for `.vue` files, this handler can be provided.
     */
    configureVue?: (configs: ConfigWithExtends) => ConfigWithExtends;
};

/**
 * Given the base configurations, if an extender function is provided, execute it to retrieve the extended
 * configurations.
 */
export function configureWithPossibleExtension(
    baseConfigs: ConfigWithExtends,
    extender: (configs: ConfigWithExtends) => ConfigWithExtends = (x) => x
): ConfigWithExtends {
    return extender(baseConfigs);
}

/**
 * Generate the configurations to use for ESLint.
 *
 * Note the following unique features while the configurations are generated:
 * - Configurations for *.ts files will inherit the plugins and rules set by the *.js configurations.
 * - Configurations for *.vue files will inherit the plugins, and rules set by the *.ts configurations.
 */
export function generateEslintConfigs(configs: EslintConfigsParams): ConfigArray {
    const cjsConfigs = configureWithPossibleExtension(getCjsConfigs(), configs.configureCjs);
    const htmlConfigs = configureWithPossibleExtension(getHtmlConfigs(), configs.configureHtml);
    const jsConfigs = configureWithPossibleExtension(getJsConfigs(), configs.configureJs);
    const jsonConfigs = configureWithPossibleExtension(getJsonConfigs(), configs.configureJson);

    const tsConfigs = configureWithPossibleExtension(getTsConfigs(jsConfigs, configs.baseDir), configs.configureTs);
    const vueConfigs = configureWithPossibleExtension(getVueConfigs(tsConfigs), configs.configureVue);

    return [
        configs.enable?.includes('cjs') ? config(cjsConfigs) : null,
        configs.enable?.includes('html') ? config(htmlConfigs) : null,
        configs.enable?.includes('js') ? config(jsConfigs) : null,
        configs.enable?.includes('json') ? config(jsonConfigs) : null,
        configs.enable?.includes('ts') ? config(tsConfigs) : null,
        configs.enable?.includes('vue') ? config(vueConfigs) : null,
    ]
        .filter((pConfigs): pConfigs is NonNullable<ConfigArray> => pConfigs !== null)
        .flatMap((pConfigs) => pConfigs);
}

/**
 * Execute the command to run ESLint.
 */
export function runEslint(params: RunEsLintPrettierParams) {
    return spawnCommand(
        [
            'DEBUG=eslint:eslint npx eslint --fix',
            ...(params.extensions ?? []).map((extension) => `--ext ${extension}`),
            ...keepOnlyExistentPaths(params.dirs ?? []),
            ...keepOnlyExistentPaths(params.files ?? []),
            ' 2>&1',
        ].join(' ')
    );
}
