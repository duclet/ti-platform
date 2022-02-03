# @ti-platform/aide-build-tools

## Table of contents

### Type aliases

- [RunEsLintPrettierParams](modules.md#runeslintprettierparams)

### Variables

- [GENERAL\_FILES](modules.md#general_files)

### Functions

- [configureWithPossibleExtension](modules.md#configurewithpossibleextension)
- [cssModification](modules.md#cssmodification)
- [generateEslintConfigs](modules.md#generateeslintconfigs)
- [generatePrettierConfigs](modules.md#generateprettierconfigs)
- [generateViteConfigs](modules.md#generateviteconfigs)
- [getLibraryFilename](modules.md#getlibraryfilename)
- [isLibraryExternalDep](modules.md#islibraryexternaldep)
- [lintAndReformat](modules.md#lintandreformat)
- [runEslint](modules.md#runeslint)
- [runPrettier](modules.md#runprettier)
- [spawnCommand](modules.md#spawncommand)

## Type aliases

### RunEsLintPrettierParams

Ƭ **RunEsLintPrettierParams**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `dirs?` | `string`[] |
| `extensions?` | `string`[] |
| `files?` | `string`[] |

#### Defined in

misc.ts:1

## Variables

### GENERAL\_FILES

• **GENERAL\_FILES**: `string`[]

#### Defined in

misc.ts:7

## Functions

### configureWithPossibleExtension

▸ **configureWithPossibleExtension**(`baseConfigs`, `extender?`): `ConfigOverride`<`RulesRecord`\>

Given the base configurations, if an extender function is provided, execute it to retrieve the extended
configurations.

#### Parameters

| Name | Type |
| :------ | :------ |
| `baseConfigs` | `ConfigOverride`<`RulesRecord`\> |
| `extender` | (`configs`: `ConfigOverride`<`RulesRecord`\>) => `ConfigOverride`<`RulesRecord`\> |

#### Returns

`ConfigOverride`<`RulesRecord`\>

#### Defined in

eslint.ts:26

___

### cssModification

▸ **cssModification**(): `Plugin`

This plugin basically removes duplicate @charset tags in the final CSS file as well as remove those legacy IE hacks.

#### Returns

`Plugin`

#### Defined in

postcss-plugins/css-modification.ts:6

___

### generateEslintConfigs

▸ **generateEslintConfigs**(`configs`): `Object`

Generate the configurations to use for ESLint.

Note the following unique features while the configurations are generated:
- Configurations for *.ts files will inherit the plugins and rules set by the *.js configurations.
- Configurations for *.vue files will inherit the plugins, and rules set by the *.ts configurations.

#### Parameters

| Name | Type |
| :------ | :------ |
| `configs` | `EslintConfigsParams` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `overrides` | (``null`` \| `ConfigOverride`<`RulesRecord`\>)[] |
| `root` | `boolean` |

#### Defined in

eslint.ts:40

___

### generatePrettierConfigs

▸ **generatePrettierConfigs**(): `Config`

#### Returns

`Config`

#### Defined in

prettier.ts:6

___

### generateViteConfigs

▸ **generateViteConfigs**(): `UserConfig`

#### Returns

`UserConfig`

#### Defined in

vite.ts:17

___

### getLibraryFilename

▸ **getLibraryFilename**(`format`): ``"index.cjs"`` \| ``"index.js"``

#### Parameters

| Name | Type |
| :------ | :------ |
| `format` | `ModuleFormat` |

#### Returns

``"index.cjs"`` \| ``"index.js"``

#### Defined in

vite.ts:5

___

### isLibraryExternalDep

▸ **isLibraryExternalDep**(`source`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `string` |

#### Returns

`boolean`

#### Defined in

vite.ts:13

___

### lintAndReformat

▸ **lintAndReformat**(`dirs`, `extensions`, `files?`, `options?`): `Plugin`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `dirs` | `string`[] | `undefined` |
| `extensions` | `string`[] | `undefined` |
| `files` | `string`[] | `GENERAL_FILES` |
| `options` | `Object` | `{}` |
| `options.verifyTs?` | `boolean` | `undefined` |
| `options.verifyVueTs?` | `boolean` | `undefined` |

#### Returns

`Plugin`

#### Defined in

vite-plugins/lint-and-reformat.ts:58

___

### runEslint

▸ **runEslint**(`params`): `SpawnSyncReturns`<`Buffer`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`RunEsLintPrettierParams`](modules.md#runeslintprettierparams) |

#### Returns

`SpawnSyncReturns`<`Buffer`\>

#### Defined in

eslint.ts:62

___

### runPrettier

▸ **runPrettier**(`params`): `SpawnSyncReturns`<`Buffer`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`RunEsLintPrettierParams`](modules.md#runeslintprettierparams) |

#### Returns

`SpawnSyncReturns`<`Buffer`\>

#### Defined in

prettier.ts:21

___

### spawnCommand

▸ **spawnCommand**(`command`): `SpawnSyncReturns`<`Buffer`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `command` | `string` |

#### Returns

`SpawnSyncReturns`<`Buffer`\>

#### Defined in

spawn.ts:3
