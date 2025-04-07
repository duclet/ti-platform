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
    * [ChunkNameConfig](#chunknameconfig)
    * [EslintConfigsParams](#eslintconfigsparams)
    * [EslintConfigType](#eslintconfigtype)
    * [ModifySourceContentsChainArgs](#modifysourcecontentschainargs)
    * [ModifySourceContentsChainHandler()](#modifysourcecontentschainhandler)
    * [ModifySourceContentsChainHandlerCreator()](#modifysourcecontentschainhandlercreator)
    * [ModifySourceContentsChainHandlerCreatorBuildArgs](#modifysourcecontentschainhandlercreatorbuildargs)
    * [RunEsLintPrettierParams](#runeslintprettierparams)
  * [Variables](#variables)
    * [~~appendFileExtensionForEsm~~](#appendfileextensionforesm)
    * [appendFileExtensionForImports](#appendfileextensionforimports)
    * [BASE\_JAVASCRIPT\_RULES](#base_javascript_rules)
    * [GENERAL\_FILES](#general_files)
    * [PATH\_AIDE\_BUILD\_TOOLS](#path_aide_build_tools)
    * [replaceAliasWithTsconfigPaths](#replacealiaswithtsconfigpaths)
  * [Functions](#functions)
    * [configureWithPossibleExtension()](#configurewithpossibleextension)
    * [createCombinedPackageJsonDependencies()](#createcombinedpackagejsondependencies)
    * [cssModification()](#cssmodification)
    * [generateEslintConfigs()](#generateeslintconfigs)
    * [generatePrettierConfigs()](#generateprettierconfigs)
    * [generateViteConfigs()](#generateviteconfigs)
    * [generateViteMultiFileLibConfigs()](#generatevitemultifilelibconfigs)
    * [getChunkName()](#getchunkname)
    * [getCjsConfigs()](#getcjsconfigs)
    * [getHtmlConfigs()](#gethtmlconfigs)
    * [getJsConfigs()](#getjsconfigs)
    * [getJsonConfigs()](#getjsonconfigs)
    * [getTsConfigs()](#gettsconfigs)
    * [getVueConfigs()](#getvueconfigs)
    * [keepOnlyExistentPaths()](#keeponlyexistentpaths)
    * [lintAndReformat()](#lintandreformat)
    * [modifySourceContentsChain()](#modifysourcecontentschain)
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

Note that in order for this to work, you will also need to have the following packages included:

* eslint
* prettier

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

Note that in order for this to work, you will also need to have the following packages included:

* typedoc
* typedoc-plugin-markdown

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

### ChunkNameConfig

> **ChunkNameConfig** = { `handler`: `string` | (`moduleId`, `actualPackage`) => `string` | [`ChunkNameConfig`](#chunknameconfig)\[]; `matcher`: `true` | `string` | `RegExp` | (`moduleId`, `actualPackage`) => `boolean`; }

Defined in: misc.ts:52

Configurations to compare against the page name and returning its chunk name.

#### Properties

| Property                       | Type                                                                                              | Description                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------------------ | ------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="handler"></a> `handler` | `string` \| (`moduleId`, `actualPackage`) => `string` \| [`ChunkNameConfig`](#chunknameconfig)\[] | When matched, used to determine the name of the chunk. Supports the following: - If it is a string, just use the string as the chunk name. - If it is a function, execute the function with the full module ID and the package name and its return value is used. - If it is an array of configs, recursively loop into and try to get the chunk name using the sub configs.                                                                  |
| <a id="matcher"></a> `matcher` | `true` \| `string` \| `RegExp` \| (`moduleId`, `actualPackage`) => `boolean`                      | Used to compare against the package name. Based on the type given, it does different things: - If true, always consider as a match (good for the catch-all case). - If it is a string, see if the package name starts with the value. - If it is a regular expression, see if the package name matches the expression. - If it is a function, execute the function with the full module ID and the package name and its return value is true. |

***

### EslintConfigsParams

> **EslintConfigsParams** = { `baseDir`: `string`; `configureCjs`: (`configs`) => `ConfigWithExtends`; `configureHtml`: (`configs`) => `ConfigWithExtends`; `configureJs`: (`configs`) => `ConfigWithExtends`; `configureJson`: (`configs`) => `ConfigWithExtends`; `configureTs`: (`configs`) => `ConfigWithExtends`; `configureVue`: (`configs`) => `ConfigWithExtends`; `enable`: [`EslintConfigType`](#eslintconfigtype)\[]; }

Defined in: eslint.ts:23

#### Properties

| Property                                    | Type                                       | Description                                                                                                   |
| ------------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| <a id="basedir"></a> `baseDir`              | `string`                                   | The base directory for your package.                                                                          |
| <a id="configurecjs"></a> `configureCjs?`   | (`configs`) => `ConfigWithExtends`         | If we need to override or extend the configurations for `.cjs` files, this handler can be provided.           |
| <a id="configurehtml"></a> `configureHtml?` | (`configs`) => `ConfigWithExtends`         | If we need to override or extend the configurations for `.html` files, this handler can be provided.          |
| <a id="configurejs"></a> `configureJs?`     | (`configs`) => `ConfigWithExtends`         | If we need to override or extend the configurations for `.js` files, this handler can be provided.            |
| <a id="configurejson"></a> `configureJson?` | (`configs`) => `ConfigWithExtends`         | If we need to override or extend the configurations for `.json` files, this handler can be provided.          |
| <a id="configurets"></a> `configureTs?`     | (`configs`) => `ConfigWithExtends`         | If we need to override or extend the configurations for `.ts` and `.cts` files, this handler can be provided. |
| <a id="configurevue"></a> `configureVue?`   | (`configs`) => `ConfigWithExtends`         | If we need to override or extend the configurations for `.vue` files, this handler can be provided.           |
| <a id="enable"></a> `enable?`               | [`EslintConfigType`](#eslintconfigtype)\[] | List of files to enable linting support for.                                                                  |

***

### EslintConfigType

> **EslintConfigType** = `"cjs"` | `"html"` | `"js"` | `"json"` | `"ts"` | `"vue"`

Defined in: eslint.ts:21

The supported configuration types for ESLint.

***

### ModifySourceContentsChainArgs

> **ModifySourceContentsChainArgs** = [`ModifySourceContentsChainHandlerCreatorBuildArgs`](#modifysourcecontentschainhandlercreatorbuildargs) & { `handlerCreators`: [`ModifySourceContentsChainHandlerCreator`](#modifysourcecontentschainhandlercreator)\[]; }

Defined in: esbuild-plugins/modify-source-contents-chain.ts:41

Arguments for the function [modifySourceContentsChain](#modifysourcecontentschain).

#### Type declaration

| Name              | Type                                                                                     | Description                    |
| ----------------- | ---------------------------------------------------------------------------------------- | ------------------------------ |
| `handlerCreators` | [`ModifySourceContentsChainHandlerCreator`](#modifysourcecontentschainhandlercreator)\[] | List of creators for handlers. |

***

### ModifySourceContentsChainHandler()

> **ModifySourceContentsChainHandler** = (`args`) => { `contents`: `string`; }

Defined in: esbuild-plugins/modify-source-contents-chain.ts:29

Handler to be given the path of the file whose content is also given. It should return an object with the updated
contents before it is passed to the next handler.

#### Parameters

| Parameter       | Type                                        |
| --------------- | ------------------------------------------- |
| `args`          | { `contents`: `string`; `path`: `string`; } |
| `args.contents` | `string`                                    |
| `args.path`     | `string`                                    |

#### Returns

{ `contents`: `string`; }

| Name       | Type     |
| ---------- | -------- |
| `contents` | `string` |

***

### ModifySourceContentsChainHandlerCreator()

> **ModifySourceContentsChainHandlerCreator** = (`args`) => [`ModifySourceContentsChainHandler`](#modifysourcecontentschainhandler)

Defined in: esbuild-plugins/modify-source-contents-chain.ts:34

Use to create the handler as part of the build step.

#### Parameters

| Parameter | Type                                                                                                                                  |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `args`    | [`ModifySourceContentsChainHandlerCreatorBuildArgs`](#modifysourcecontentschainhandlercreatorbuildargs) & { `build`: `PluginBuild`; } |

#### Returns

[`ModifySourceContentsChainHandler`](#modifysourcecontentschainhandler)

***

### ModifySourceContentsChainHandlerCreatorBuildArgs

> **ModifySourceContentsChainHandlerCreatorBuildArgs** = { `cwd`: `string`; `debug`: `boolean`; `extensions`: `string`\[]; }

Defined in: esbuild-plugins/modify-source-contents-chain.ts:8

Arguments passed to the [ModifySourceContentsChainHandlerCreator](#modifysourcecontentschainhandlercreator) during the build step.

#### Properties

| Property                              | Type        | Description                                                                               |
| ------------------------------------- | ----------- | ----------------------------------------------------------------------------------------- |
| <a id="cwd"></a> `cwd?`               | `string`    | The current working directory. Defaults to whatever value is returned by `process.cwd()`. |
| <a id="debug"></a> `debug?`           | `boolean`   | Set to true to output some debugging information while executing. Defaults to `false`.    |
| <a id="extensions"></a> `extensions?` | `string`\[] | The list of file extensions to parse. Defaults to `[".ts"]`.                              |

***

### RunEsLintPrettierParams

> **RunEsLintPrettierParams** = { `dirs`: `string`\[]; `extensions`: `string`\[]; `files`: `string`\[]; }

Defined in: misc.ts:5

#### Properties

| Property                                | Type        | Description                                           |
| --------------------------------------- | ----------- | ----------------------------------------------------- |
| <a id="dirs"></a> `dirs?`               | `string`\[] | List of directory glob patterns to run the linter on. |
| <a id="extensions-1"></a> `extensions?` | `string`\[] | List of file extensions to run the linter on.         |
| <a id="files"></a> `files?`             | `string`\[] | List of files to run the linter on.                   |

## Variables

### ~~appendFileExtensionForEsm~~

> `const` **appendFileExtensionForEsm**: [`ModifySourceContentsChainHandlerCreator`](#modifysourcecontentschainhandlercreator) = `appendFileExtensionForImports`

Defined in: esbuild-plugins/handler-creators/append-file-extension-for-esm.ts:10

This will append the file extension to the end of relative imports if we are building for ESM.

#### Deprecated

Just use `appendFileExtensionForImports` which will add it for both ESM and CJS since they'll end up
needing it.

***

### appendFileExtensionForImports

> `const` **appendFileExtensionForImports**: [`ModifySourceContentsChainHandlerCreator`](#modifysourcecontentschainhandlercreator)

Defined in: esbuild-plugins/handler-creators/append-file-extension-for-imports.ts:28

This will append the file extension to the end of relative imports if we are building for ESM and CJS.

***

### BASE\_JAVASCRIPT\_RULES

> `const` **BASE\_JAVASCRIPT\_RULES**: `Partial`<`Linter.RulesRecord`>

Defined in: eslint/javascript-configs.ts:12

Shared rules for `.cjs` and `.js` files.

***

### GENERAL\_FILES

> `const` **GENERAL\_FILES**: `string`\[]

Defined in: misc.ts:25

General list of files that most packages should have that we want to lint and format.

***

### PATH\_AIDE\_BUILD\_TOOLS

> `const` **PATH\_AIDE\_BUILD\_TOOLS**: `string`

Defined in: misc.ts:39

***

### replaceAliasWithTsconfigPaths

> `const` **replaceAliasWithTsconfigPaths**: [`ModifySourceContentsChainHandlerCreator`](#modifysourcecontentschainhandlercreator)

Defined in: esbuild-plugins/handler-creators/replace-alias-with-tsconfig-paths.ts:24

This plugin allows the use of path aliases in TSConfig, and it will be replaced with the mapped value in the
generated output. This plugin makes use of simple string matching and replace so that it can still be fast. If you
want to use a plugin that is likely safer which actually parses the code and does the replacement, you can look at
the plugin available here: <https://github.com/wjfei/esbuild-plugin-tsconfig-paths>

#### Throws

Throws a `tsconfig-path#ConfigLoaderFailResult` If we cannot load the `tsconfig.json` file for this package.

## Functions

### configureWithPossibleExtension()

> **configureWithPossibleExtension**(`baseConfigs`, `extender`): `ConfigWithExtends`

Defined in: eslint.ts:69

Given the base configurations, if an extender function is provided, execute it to retrieve the extended
configurations.

#### Parameters

| Parameter     | Type                               |
| ------------- | ---------------------------------- |
| `baseConfigs` | `ConfigWithExtends`                |
| `extender`    | (`configs`) => `ConfigWithExtends` |

#### Returns

`ConfigWithExtends`

***

### createCombinedPackageJsonDependencies()

> **createCombinedPackageJsonDependencies**(): `void`

Defined in: package-json-utils.ts:64

Combine all the versions of the various given package.json files into one. Note that this will create a package.json
file that will simply write all dependencies into the "dependencies" block on the package.json.

#### Returns

`void`

***

### cssModification()

> **cssModification**(): `Plugin`

Defined in: postcss-plugins/css-modification.ts:6

This plugin basically removes duplicate charset tags in the final CSS file as well as remove those legacy IE hacks.

#### Returns

`Plugin`

***

### generateEslintConfigs()

> **generateEslintConfigs**(`configs`): `ConfigArray`

Defined in: eslint.ts:83

Generate the configurations to use for ESLint.

Note the following unique features while the configurations are generated:

* Configurations for \*.ts files will inherit the plugins and rules set by the \*.js configurations.
* Configurations for \*.vue files will inherit the plugins, and rules set by the \*.ts configurations.

#### Parameters

| Parameter | Type                                          |
| --------- | --------------------------------------------- |
| `configs` | [`EslintConfigsParams`](#eslintconfigsparams) |

#### Returns

`ConfigArray`

***

### generatePrettierConfigs()

> **generatePrettierConfigs**(): `Config`

Defined in: prettier.ts:9

Get the default configurations for Prettier.

#### Returns

`Config`

***

### generateViteConfigs()

> **generateViteConfigs**(): `Promise`<`UserConfig`>

Defined in: vite.ts:8

Get the default configurations for Vite.

#### Returns

`Promise`<`UserConfig`>

***

### generateViteMultiFileLibConfigs()

> **generateViteMultiFileLibConfigs**(`entries`): `Promise`<`UserConfig`>

Defined in: vite.ts:24

Get the default configurations for Vite if we want to generate individual files as part of a library export. This
will make it so that all the files referenced by the given `entries` will be generated using the same directory
structure as it is in the `src` folder. For Vue components, it will remove the `.vue` in the file extension. For the
extracted CSS from the Vue files, it will also place them in the same folder as the component itself.

#### Parameters

| Parameter | Type        |
| --------- | ----------- |
| `entries` | `string`\[] |

#### Returns

`Promise`<`UserConfig`>

***

### getChunkName()

> **getChunkName**(`configs`, `moduleId`): `undefined` | `string`

Defined in: misc.ts:85

For the given configs and full module ID, return the name for the chunk or undefined if it is not supported. This
will only match against imports for packages under node\_modules. Should be used by the "manualChunks" function for
Rollup.

#### Parameters

| Parameter  | Type                                     | Description                                                                 |
| ---------- | ---------------------------------------- | --------------------------------------------------------------------------- |
| `configs`  | [`ChunkNameConfig`](#chunknameconfig)\[] | Configurations with the pattern to match against and the chunk name to use. |
| `moduleId` | `string`                                 | ID of the module to get the chunk name for.                                 |

#### Returns

`undefined` | `string`

The name of the chunk to use or undefined to let Rollup decides for itself.

***

### getCjsConfigs()

> **getCjsConfigs**(): `ConfigWithExtends`

Defined in: eslint/javascript-configs.ts:20

ESLint configurations for CommonJS files.

#### Returns

`ConfigWithExtends`

***

### getHtmlConfigs()

> **getHtmlConfigs**(): `ConfigWithExtends`

Defined in: eslint/html-configs.ts:8

Get the default configurations for `.html` files.

#### Returns

`ConfigWithExtends`

***

### getJsConfigs()

> **getJsConfigs**(): `ConfigWithExtends`

Defined in: eslint/javascript-configs.ts:43

ESLint confgurations for JavaScript files.

#### Returns

`ConfigWithExtends`

***

### getJsonConfigs()

> **getJsonConfigs**(): `ConfigWithExtends`

Defined in: eslint/json-configs.ts:8

Get the default configurations for `.json` files.

#### Returns

`ConfigWithExtends`

***

### getTsConfigs()

> **getTsConfigs**(`jsConfigs`, `baseDir`): `ConfigWithExtends`

Defined in: eslint/typescript-configs.ts:9

Get the default configurations for `.ts` files.

#### Parameters

| Parameter   | Type                |
| ----------- | ------------------- |
| `jsConfigs` | `ConfigWithExtends` |
| `baseDir`   | `string`            |

#### Returns

`ConfigWithExtends`

***

### getVueConfigs()

> **getVueConfigs**(`tsConfigs`): `ConfigWithExtends`

Defined in: eslint/vue-configs.ts:10

Get default configurations for `.vue` files.

#### Parameters

| Parameter   | Type                |
| ----------- | ------------------- |
| `tsConfigs` | `ConfigWithExtends` |

#### Returns

`ConfigWithExtends`

***

### keepOnlyExistentPaths()

> **keepOnlyExistentPaths**(`paths`): `string`\[]

Defined in: misc.ts:44

Given a list of paths, remove files that doesn't exist.

#### Parameters

| Parameter | Type        |
| --------- | ----------- |
| `paths`   | `string`\[] |

#### Returns

`string`\[]

***

### lintAndReformat()

> **lintAndReformat**(`dirs`, `extensions`, `files`, `options`): `Plugin`

Defined in: vite-plugins/lint-and-reformat.ts:69

Lint and reformat the code.

Note that this contains an escape hatch to linting so you can still "build" by including the environment variable
`DISABLE_LINTING`.

#### Parameters

| Parameter              | Type                                                 | Default value   |
| ---------------------- | ---------------------------------------------------- | --------------- |
| `dirs`                 | `string`\[]                                          | `undefined`     |
| `extensions`           | `string`\[]                                          | `undefined`     |
| `files`                | `string`\[]                                          | `GENERAL_FILES` |
| `options`              | { `verifyTs`: `boolean`; `verifyVueTs`: `boolean`; } | `{}`            |
| `options.verifyTs`?    | `boolean`                                            | `undefined`     |
| `options.verifyVueTs`? | `boolean`                                            | `undefined`     |

#### Returns

`Plugin`

***

### modifySourceContentsChain()

> **modifySourceContentsChain**(`__namedParameters`): `Plugin`

Defined in: esbuild-plugins/modify-source-contents-chain.ts:64

While esbuild allows you to add multiple handlers for its onLoad event, once one of the handler returns something,
the subsequent handlers will not run. That means we can't have multiple handlers that updates the source content.
This plugin allows for the possibility.

#### Parameters

| Parameter           | Type                                                              |
| ------------------- | ----------------------------------------------------------------- |
| `__namedParameters` | [`ModifySourceContentsChainArgs`](#modifysourcecontentschainargs) |

#### Returns

`Plugin`

***

### runEslint()

> **runEslint**(`params`): `SpawnSyncReturns`<`Buffer`<`ArrayBufferLike`>>

Defined in: eslint.ts:107

Execute the command to run ESLint.

#### Parameters

| Parameter | Type                                                  |
| --------- | ----------------------------------------------------- |
| `params`  | [`RunEsLintPrettierParams`](#runeslintprettierparams) |

#### Returns

`SpawnSyncReturns`<`Buffer`<`ArrayBufferLike`>>

***

### runPrettier()

> **runPrettier**(`params`): `SpawnSyncReturns`<`Buffer`<`ArrayBufferLike`>>

Defined in: prettier.ts:27

Execute the command to run Prettier.

#### Parameters

| Parameter | Type                                                  |
| --------- | ----------------------------------------------------- |
| `params`  | [`RunEsLintPrettierParams`](#runeslintprettierparams) |

#### Returns

`SpawnSyncReturns`<`Buffer`<`ArrayBufferLike`>>

***

### spawnCommand()

> **spawnCommand**(`command`): `SpawnSyncReturns`<`Buffer`<`ArrayBufferLike`>>

Defined in: spawn.ts:6

Spawn the given command synchronously and passing along the current environment variables.

#### Parameters

| Parameter | Type     |
| --------- | -------- |
| `command` | `string` |

#### Returns

`SpawnSyncReturns`<`Buffer`<`ArrayBufferLike`>>

***

### updatePackageJsonVersions()

> **updatePackageJsonVersions**(): `void`

Defined in: package-json-utils.ts:176

Retrieve all the versions from the source package.json and update the target package.json with the versions from the
source.

#### Returns

`void`
