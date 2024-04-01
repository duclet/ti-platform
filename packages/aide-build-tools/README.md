# @ti-platform/aide-build-tools

This package contains a bunch of tools and default configurations to help build libraries and sharable packages. Refer
to the API Docs below for the types, variables, and functions that are exposed.

# Contents

* [Binaries](#binaries)
  * [Linters](#linters)
  * [API Docs Generator](#api-docs-generator)
  * [package.json Version Sync](#packagejson-version-sync)
* [API Docs](#api-docs)
  * [Type Aliases](#type-aliases)
    * [EslintConfigType](#eslintconfigtype)
    * [EslintConfigsParams](#eslintconfigsparams)
    * [ModifySourceContentsChainArgs](#modifysourcecontentschainargs)
    * [ModifySourceContentsChainHandler()](#modifysourcecontentschainhandler)
    * [ModifySourceContentsChainHandlerCreator()](#modifysourcecontentschainhandlercreator)
    * [ModifySourceContentsChainHandlerCreatorBuildArgs](#modifysourcecontentschainhandlercreatorbuildargs)
    * [RunEsLintPrettierParams](#runeslintprettierparams)
  * [Variables](#variables)
    * [BASE\_JAVASCRIPT\_RULES](#base_javascript_rules)
    * [GENERAL\_FILES](#general_files)
  * [Functions](#functions)
    * [~~appendFileExtensionForEsm()~~](#appendfileextensionforesm)
    * [appendFileExtensionForImports()](#appendfileextensionforimports)
    * [configureWithPossibleExtension()](#configurewithpossibleextension)
    * [createCombinedPackageJsonDependencies()](#createcombinedpackagejsondependencies)
    * [cssModification()](#cssmodification)
    * [generateEslintConfigs()](#generateeslintconfigs)
    * [generatePrettierConfigs()](#generateprettierconfigs)
    * [generateViteConfigs()](#generateviteconfigs)
    * [generateViteMultiFileLibConfigs()](#generatevitemultifilelibconfigs)
    * [getCjsConfigs()](#getcjsconfigs)
    * [getHtmlConfigs()](#gethtmlconfigs)
    * [getJsConfigs()](#getjsconfigs)
    * [getJsonConfigs()](#getjsonconfigs)
    * [getTsConfigs()](#gettsconfigs)
    * [getVueConfigs()](#getvueconfigs)
    * [keepOnlyExistentPaths()](#keeponlyexistentpaths)
    * [lintAndReformat()](#lintandreformat)
    * [modifySourceContentsChain()](#modifysourcecontentschain)
    * [replaceAliasWithTsconfigPaths()](#replacealiaswithtsconfigpaths)
    * [runEslint()](#runeslint)
    * [runPrettier()](#runprettier)
    * [spawnCommand()](#spawncommand)
    * [updatePackageJsonVersions()](#updatepackagejsonversions)

# Binaries

The following binaries are exposed:

## Linters

```
Usage:
  {run-eslint|run-prettier|run-linter} [flags...]

Flags:
  -c, --command <string>             Optional list of commands to run after linting is complete
  -d, --dir <string>                 Directory to scan
  -e, --extension <string>           Extension to scan. Ex: .ts
  -f, --file <string>                File to include. Ex: ./my-file.ts
  -h, --help                         Show help
  -g, --include-general-files        Include some of the general files like package.json, prettier.config.cjs, etc when linting
  -k, --kill-on-error                Kill the process when a linter fails rather than continuing on initial run
  -w, --watch                        Enable watch mode
  -s, --watch-only                   Skip the initial linting and only watch files
```

There are 3 binaries available here: `run-eslint`, `run-prettier`, and `run-linter`. The first two simply runs the
linting tool in their name while the latter runs both of them sequentially (first ESLint, then Prettier).

## API Docs Generator

```
Usage:
  run-typedoc [flags...]

Flags:
  -b, --base-readme <string>                    The base file to inject the generated content into. (default: "./base-readme.md")
  -h, --help                                    Show help
  -v, --include-vue-doc-gen                     Include the generation of vue-docgen-cli.
  -i, --input-file <string>                     The input file. (default: "./src/index.ts")
  -o, --out-dir <string>                        Directory to output the generated content. (default: "./docs")
  -c, --vue-doc-gen-config-file <string>        The path to the configuration file for vue-docgen-cli. (default: "./docgen.config.cjs")
```

So what the whole point of this binary? It basically came into existent because I couldn't find a single tool that
generates good-looking API Docs and good documentation for Vue components. As such, this actually combines 2 tools,
TypeDoc and Vue-DocGen.

The way this works is that it will find a base file and then inject into it contents from the two tools by replacing
some of the placeholder text in it. As such, you'll be able to include custom content within the doc (the documentation
you are reading about these binaries are custom as an example). Below are the text it will look for and replace (note
that both of the options requires the string to be wrapped around with `---`, the only reason I'm not including it below
is that I used some very simply string matching and replace and as such will probably replace the string too if I have
it exactly as is):

* `Insert API Docs`: Will be replaced with the contents of TypeDoc.
* `Insert components`: Will be replaced with the contents of Vue-DocGen.

## package.json Version Sync

```
Usage:
  create-combined-package-json-dependencies [flags...]

Flags:
  -d, --dry-run                          Enable dry-run mode which not actually write the target file. If changing to "false" must be passed as "-d=false". (default: true)                                                                                                                                           
  -h, --help                             Show help                                                                                                                                                                                                                                                                    
  -s, --source-path <string>             Either the path or glob pattern for the package.json files to read to get the dependencies.                                                                                                                                                                                  
  -t, --target-path <string>             Path to target package.json that will be created.                                                                                                                                                                                                                            
  -n, --write-on-no-conflict-only        Enable to only write the target files if there are no conflict between sources. (default: true)
```

```
Usage:
  update-package-json-versions [flags...]

Flags:
  -d, --dry-run                     Enable dry-run mode which will not actually update the target package.json. If changing to "false" must be passed as "-d=false". (default: true)                                                                                                                                  
  -h, --help                        Show help                                                                                                                                                                                                                                                                         
  -s, --source-path <string>        Path to source package.json with versions to copy from.                                                                                                                                                                                                                           
  -t, --target-path <string>        Path to target package.json that will have its versions updated.
```

These 2 binaries together can help you keep versions of various dependencies in-sync across multiple packages even if
they are not in the same repository. Most other tooling only support something similar to this if all the packages are
part of the same repository so this package came into existent to solve those other cases. This is a good way to ensure
you use the same version of dependencies that other dependencies you use rely on. For example, this package, since it
provides a pattern for building libraries and makes many assumptions, relies on the fact that certain dependencies are
at certain versions. Should you choose to follow the patterns of this package and want to keep your versions of
dependencies in-sync with this package and other packages under its same mono-repositories, you can do so. Just
basically run `update-package-json-versions` by using the exported `package-versions.json` from this package as a source
and set to target to your `package.json` and you will end up using the same exact versions. Note that you can also just
specify the path directly to this package's `package.json` file to only care about the dependencies of this package, the
other file I've mentioned is a combined view of all the packages under the same mono repository. Should you want to
create the same combined file, you can use `create-combined-package-json-dependencies` binary to achieve that.

Note that if you a providing a glob for the pattern, be sure to wrap it in quotes.

# API Docs

## Type Aliases

### EslintConfigType

> **EslintConfigType**: `"cjs"` | `"html"` | `"js"` | `"json"` | `"ts"` | `"vue"`

#### Source

eslint.ts:17

***

### EslintConfigsParams

> **EslintConfigsParams**: `Object`

#### Type declaration

| Member | Type | Description |
| :------ | :------ | :------ |
| `baseDir` | `string` | The base directory for your package. |
| `configureCjs` | (`configs`) => `Linter.ConfigOverride` | If we need to override or extend the configurations for `.cjs` files, this handler can be provided. |
| `configureHtml` | (`configs`) => `Linter.ConfigOverride` | If we need to override or extend the configurations for `.html` files, this handler can be provided. |
| `configureJs` | (`configs`) => `Linter.ConfigOverride` | If we need to override or extend the configurations for `.js` files, this handler can be provided. |
| `configureJson` | (`configs`) => `Linter.ConfigOverride` | If we need to override or extend the configurations for `.json` files, this handler can be provided. |
| `configureTs` | (`configs`) => `Linter.ConfigOverride` | If we need to override or extend the configurations for `.ts` files, this handler can be provided. |
| `configureVue` | (`configs`) => `Linter.ConfigOverride` | If we need to override or extend the configurations for `.vue` files, this handler can be provided. |
| `enable` | [`EslintConfigType`](README.md#eslintconfigtype)\[] | List of files to enable linting support for. |

#### Source

eslint.ts:19

***

### ModifySourceContentsChainArgs

> **ModifySourceContentsChainArgs**: [`ModifySourceContentsChainHandlerCreatorBuildArgs`](README.md#modifysourcecontentschainhandlercreatorbuildargs) & `Object`

Arguments for the function [modifySourceContentsChain](README.md#modifysourcecontentschain).

#### Type declaration

| Member | Type | Description |
| :------ | :------ | :------ |
| `handlerCreators` | [`ModifySourceContentsChainHandlerCreator`](README.md#modifysourcecontentschainhandlercreator)\[] | List of creators for handlers. |

#### Source

esbuild-plugins/modify-source-contents-chain.ts:41

***

### ModifySourceContentsChainHandler()

> **ModifySourceContentsChainHandler**: (`args`) => `Object`

Handler to be given the path of the file whose content is also given. It should return an object with the updated
contents before it is passed to the next handler.

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.contents` | `string` |
| `args.path` | `string` |

#### Returns

`Object`

| Member | Type |
| :------ | :------ |
| `contents` | `string` |

#### Source

esbuild-plugins/modify-source-contents-chain.ts:29

***

### ModifySourceContentsChainHandlerCreator()

> **ModifySourceContentsChainHandlerCreator**: (`args`) => [`ModifySourceContentsChainHandler`](README.md#modifysourcecontentschainhandler)

Use to create the handler as part of the build step.

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `args` | [`ModifySourceContentsChainHandlerCreatorBuildArgs`](README.md#modifysourcecontentschainhandlercreatorbuildargs) & `Object` |

#### Returns

[`ModifySourceContentsChainHandler`](README.md#modifysourcecontentschainhandler)

#### Source

esbuild-plugins/modify-source-contents-chain.ts:34

***

### ModifySourceContentsChainHandlerCreatorBuildArgs

> **ModifySourceContentsChainHandlerCreatorBuildArgs**: `Object`

Arguments passed to the [ModifySourceContentsChainHandlerCreator](README.md#modifysourcecontentschainhandlercreator) during the build step.

#### Type declaration

| Member | Type | Description |
| :------ | :------ | :------ |
| `cwd` | `string` | The current working directory. Defaults to whatever value is returned by `process.cwd()`. |
| `debug` | `boolean` | Set to true to output some debugging information while executing. Defaults to `false`. |
| `extensions` | `string`\[] | The list of file extensions to parse. Defaults to `[".ts"]`. |

#### Source

esbuild-plugins/modify-source-contents-chain.ts:8

***

### RunEsLintPrettierParams

> **RunEsLintPrettierParams**: `Object`

#### Type declaration

| Member | Type | Description |
| :------ | :------ | :------ |
| `dirs` | `string`\[] | List of directory glob patterns to run the linter on. |
| `extensions` | `string`\[] | List of file extensions to run the linter on. |
| `files` | `string`\[] | List of files to run the linter on. |

#### Source

misc.ts:5

## Variables

### BASE\_JAVASCRIPT\_RULES

> **`const`** **BASE\_JAVASCRIPT\_RULES**: `Partial`<`Linter.RulesRecord`>

Shared rules for `.cjs` and `.js` files.

#### Source

eslint/javascript-configs.ts:6

***

### GENERAL\_FILES

> **`const`** **GENERAL\_FILES**: `string`\[]

General list of files that most packages should have that we want to lint and format.

#### Source

misc.ts:25

## Functions

### ~~appendFileExtensionForEsm()~~

> **appendFileExtensionForEsm**(`args`): [`ModifySourceContentsChainHandler`](README.md#modifysourcecontentschainhandler)

This will append the file extension to the end of relative imports if we are building for ESM.

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `args` | [`ModifySourceContentsChainHandlerCreatorBuildArgs`](README.md#modifysourcecontentschainhandlercreatorbuildargs) & `Object` |

#### Returns

[`ModifySourceContentsChainHandler`](README.md#modifysourcecontentschainhandler)

#### Deprecated

Just use `appendFileExtensionForImports` which will add it for both ESM and CJS since they'll end up
needing it.

#### Source

esbuild-plugins/handler-creators/append-file-extension-for-esm.ts:10

***

### appendFileExtensionForImports()

> **appendFileExtensionForImports**(`args`): [`ModifySourceContentsChainHandler`](README.md#modifysourcecontentschainhandler)

This will append the file extension to the end of relative imports if we are building for ESM and CJS.

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `args` | [`ModifySourceContentsChainHandlerCreatorBuildArgs`](README.md#modifysourcecontentschainhandlercreatorbuildargs) & `Object` |

#### Returns

[`ModifySourceContentsChainHandler`](README.md#modifysourcecontentschainhandler)

#### Source

esbuild-plugins/handler-creators/append-file-extension-for-imports.ts:28

***

### configureWithPossibleExtension()

> **configureWithPossibleExtension**(`baseConfigs`, `extender`): `Linter.ConfigOverride`

Given the base configurations, if an extender function is provided, execute it to retrieve the extended
configurations.

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `baseConfigs` | `ConfigOverride`<`RulesRecord`> |
| `extender` | (`configs`) => `ConfigOverride`<`RulesRecord`> |

#### Returns

`Linter.ConfigOverride`

#### Source

eslint.ts:65

***

### createCombinedPackageJsonDependencies()

> **createCombinedPackageJsonDependencies**(): `void`

Combine all the versions of the various given package.json files into one. Note that this will create a package.json
file that will simply write all dependencies into the "dependencies" block on the package.json.

#### Returns

`void`

#### Source

package-json-utils.ts:64

***

### cssModification()

> **cssModification**(): `Plugin`

This plugin basically removes duplicate

#### Returns

`Plugin`

#### Charset

tags in the final CSS file as well as remove those legacy IE hacks.

#### Source

postcss-plugins/css-modification.ts:6

***

### generateEslintConfigs()

> **generateEslintConfigs**(`configs`): `Linter.Config`

Generate the configurations to use for ESLint.

Note the following unique features while the configurations are generated:

* Configurations for \*.ts files will inherit the plugins and rules set by the \*.js configurations.
* Configurations for \*.vue files will inherit the plugins, and rules set by the \*.ts configurations.

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `configs` | [`EslintConfigsParams`](README.md#eslintconfigsparams) |

#### Returns

`Linter.Config`

#### Source

eslint.ts:79

***

### generatePrettierConfigs()

> **generatePrettierConfigs**(): `Config`

Get the default configurations for Prettier.

#### Returns

`Config`

#### Source

prettier.ts:9

***

### generateViteConfigs()

> **generateViteConfigs**(): `Promise`<`UserConfig`>

Get the default configurations for Vite.

#### Returns

`Promise`<`UserConfig`>

#### Source

vite.ts:8

***

### generateViteMultiFileLibConfigs()

> **generateViteMultiFileLibConfigs**(`entries`): `Promise`<`UserConfig`>

Get the default configurations for Vite if we want to generate individual files as part of a library export. This
will make it so that all the files referenced by the given `entries` will be generated using the same directory
structure as it is in the `src` folder. For Vue components, it will remove the `.vue` in the file extension. For the
extracted CSS from the Vue files, it will also place them in the same folder as the component itself.

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `entries` | `string`\[] |

#### Returns

`Promise`<`UserConfig`>

#### Source

vite.ts:24

***

### getCjsConfigs()

> **getCjsConfigs**(): `Linter.ConfigOverride`

Get the default configurations for `.cjs` files.

#### Returns

`Linter.ConfigOverride`

#### Source

eslint/javascript-configs.ts:14

***

### getHtmlConfigs()

> **getHtmlConfigs**(): `Linter.ConfigOverride`

Get the default configurations for `.html` files.

#### Returns

`Linter.ConfigOverride`

#### Source

eslint/html-configs.ts:6

***

### getJsConfigs()

> **getJsConfigs**(): `Linter.ConfigOverride`

Get the default configurations for `.js` files.

#### Returns

`Linter.ConfigOverride`

#### Source

eslint/javascript-configs.ts:33

***

### getJsonConfigs()

> **getJsonConfigs**(): `Linter.ConfigOverride`

Get the default configurations for `.json` files.

#### Returns

`Linter.ConfigOverride`

#### Source

eslint/json-configs.ts:6

***

### getTsConfigs()

> **getTsConfigs**(`jsConfigs`, `baseDir`): `Linter.ConfigOverride`

Get the default configurations for `.ts` files.

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `jsConfigs` | `ConfigOverride`<`RulesRecord`> |
| `baseDir` | `string` |

#### Returns

`Linter.ConfigOverride`

#### Source

eslint/typescript-configs.ts:7

***

### getVueConfigs()

> **getVueConfigs**(`tsConfigs`): `Linter.ConfigOverride`

Get default configurations for `.vue` files.

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `tsConfigs` | `ConfigOverride`<`RulesRecord`> |

#### Returns

`Linter.ConfigOverride`

#### Source

eslint/vue-configs.ts:6

***

### keepOnlyExistentPaths()

> **keepOnlyExistentPaths**(`paths`): `string`\[]

Given a list of paths, remove files that doesn't exists.

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `paths` | `string`\[] |

#### Returns

`string`\[]

#### Source

misc.ts:37

***

### lintAndReformat()

> **lintAndReformat**(`dirs`, `extensions`, `files`, `options`): `Plugin`

Lint and reformat the code.

Note that this contains an escape hatch to linting so you can still "build" by including the environment variable
`DISABLE_LINTING`.

#### Parameters

| Parameter | Type | Default value |
| :------ | :------ | :------ |
| `dirs` | `string`\[] | `undefined` |
| `extensions` | `string`\[] | `undefined` |
| `files` | `string`\[] | `GENERAL_FILES` |
| `options` | `Object` | `{}` |
| `options.verifyTs`? | `boolean` | `undefined` |
| `options.verifyVueTs`? | `boolean` | `undefined` |

#### Returns

`Plugin`

#### Source

vite-plugins/lint-and-reformat.ts:69

***

### modifySourceContentsChain()

> **modifySourceContentsChain**(`__namedParameters`): `Plugin`

While esbuild allows you to add multiple handlers for its onLoad event, once one of the handler returns something,
the subsequent handlers will not run. That means we can't have multiple handlers that updates the source content.
This plugin allows for the possibility.

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `__namedParameters` | [`ModifySourceContentsChainArgs`](README.md#modifysourcecontentschainargs) |

#### Returns

`Plugin`

#### Source

esbuild-plugins/modify-source-contents-chain.ts:64

***

### replaceAliasWithTsconfigPaths()

> **replaceAliasWithTsconfigPaths**(`args`): [`ModifySourceContentsChainHandler`](README.md#modifysourcecontentschainhandler)

This plugin allows the use of path aliases in TSConfig, and it will be replaced with the mapped value in the
generated output. This plugin makes use of simple string matching and replace so that it can still be fast. If you
want to use a plugin that is likely safer which actually parses the code and does the replacement, you can look at
the plugin available here: https://github.com/wjfei/esbuild-plugin-tsconfig-paths

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `args` | [`ModifySourceContentsChainHandlerCreatorBuildArgs`](README.md#modifysourcecontentschainhandlercreatorbuildargs) & `Object` |

#### Returns

[`ModifySourceContentsChainHandler`](README.md#modifysourcecontentschainhandler)

#### Throws

Throws a `tsconfig-path#ConfigLoaderFailResult` If we cannot load the `tsconfig.json` file for this package.

#### Source

esbuild-plugins/handler-creators/replace-alias-with-tsconfig-paths.ts:24

***

### runEslint()

> **runEslint**(`params`): `SpawnSyncReturns`<`Buffer`>

Execute the command to run ESLint.

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `params` | [`RunEsLintPrettierParams`](README.md#runeslintprettierparams) |

#### Returns

`SpawnSyncReturns`<`Buffer`>

#### Source

eslint.ts:104

***

### runPrettier()

> **runPrettier**(`params`): `SpawnSyncReturns`<`Buffer`>

Execute the command to run Prettier.

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `params` | [`RunEsLintPrettierParams`](README.md#runeslintprettierparams) |

#### Returns

`SpawnSyncReturns`<`Buffer`>

#### Source

prettier.ts:27

***

### spawnCommand()

> **spawnCommand**(`command`): `SpawnSyncReturns`<`Buffer`>

Spawn the given command synchronously and passing along the current environment variables.

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `command` | `string` |

#### Returns

`SpawnSyncReturns`<`Buffer`>

#### Source

spawn.ts:6

***

### updatePackageJsonVersions()

> **updatePackageJsonVersions**(): `void`

Retrieve all the versions from the source package.json and update the target package.json with the versions from the
source.

#### Returns

`void`

#### Source

package-json-utils.ts:176
