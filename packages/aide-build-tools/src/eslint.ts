import { getHtmlConfigs } from '@src/eslint/html-configs';
import { getCjsConfigs, getJsConfigs } from '@src/eslint/javascript-configs';
import { getJsonConfigs } from '@src/eslint/json-configs';
import { getTsConfigs } from '@src/eslint/typescript-configs';
import { getVueConfigs } from '@src/eslint/vue-configs';
import type { RunEsLintPrettierParams } from '@src/misc';
import { keepOnlyExistentPaths } from '@src/misc';
import { spawnCommand } from '@src/spawn';
import type { Linter } from 'eslint';

export * from '@src/eslint/html-configs';
export * from '@src/eslint/javascript-configs';
export * from '@src/eslint/json-configs';
export * from '@src/eslint/typescript-configs';
export * from '@src/eslint/vue-configs';

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
    configureCjs?: (configs: Linter.ConfigOverride) => Linter.ConfigOverride;

    /**
     * If we need to override or extend the configurations for `.html` files, this handler can be provided.
     */
    configureHtml?: (configs: Linter.ConfigOverride) => Linter.ConfigOverride;

    /**
     * If we need to override or extend the configurations for `.js` files, this handler can be provided.
     */
    configureJs?: (configs: Linter.ConfigOverride) => Linter.ConfigOverride;

    /**
     * If we need to override or extend the configurations for `.json` files, this handler can be provided.
     */
    configureJson?: (configs: Linter.ConfigOverride) => Linter.ConfigOverride;

    /**
     * If we need to override or extend the configurations for `.ts` files, this handler can be provided.
     */
    configureTs?: (configs: Linter.ConfigOverride) => Linter.ConfigOverride;

    /**
     * If we need to override or extend the configurations for `.vue` files, this handler can be provided.
     */
    configureVue?: (configs: Linter.ConfigOverride) => Linter.ConfigOverride;
};

/**
 * Given the base configurations, if an extender function is provided, execute it to retrieve the extended
 * configurations.
 */
export function configureWithPossibleExtension(
    baseConfigs: Linter.ConfigOverride,
    extender: (configs: Linter.ConfigOverride) => Linter.ConfigOverride = (x) => x
): Linter.ConfigOverride {
    return extender(baseConfigs);
}

/**
 * Generate the configurations to use for ESLint.
 *
 * Note the following unique features while the configurations are generated:
 * - Configurations for *.ts files will inherit the plugins and rules set by the *.js configurations.
 * - Configurations for *.vue files will inherit the plugins, and rules set by the *.ts configurations.
 */
export function generateEslintConfigs(configs: EslintConfigsParams): Linter.Config {
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
        ].filter((config): config is NonNullable<Linter.ConfigOverride> => config !== null),
    };
}

/**
 * Execute the command to run ESLint.
 */
export function runEslint(params: RunEsLintPrettierParams) {
    return spawnCommand(
        [
            'DEBUG=eslint:cli-engine npx eslint --fix',
            ...(params.extensions ?? []).map((extension) => `--ext ${extension}`),
            ...keepOnlyExistentPaths(params.dirs ?? []),
            ...keepOnlyExistentPaths(params.files ?? []),
            ' 2>&1',
        ].join(' ')
    );
}
