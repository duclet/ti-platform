# @ti-platform/aide-build-tools

This package contains a bunch of tools and default configurations to help build libraries and sharable packages. Refer
to the API Docs below for the types, variables, and functions that are exposed.

## Binaries
The following binaries are exposed:

### Linters
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

### API Docs Generator
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

Please note that this tool assumes and requires the extension `typedoc-plugin-markdown` to be installed. You'll also 
need configure TypeDoc to use that plugin. You can do so in your `package.json` file but including the following:

```
...
    "typedocOptions": {
        "plugin": [
            "typedoc-plugin-markdown"
        ]
    }
...
```

So what the whole point of this binary? It basically came into existent because I couldn't find a single tool that 
generates good-looking API Docs and good documentation for Vue components. As such, this actually combines 2 tools,
TypeDoc and Vue-DocGen.

The way this works is that it will find a base file and then inject into it contents from the two tools by replacing
some of the placeholder text in it. As such, you'll be able to include custom content within the doc (the documentation
you are reading about these binaries are custom as an example). Below are the text it will look for and replace (note
that both of the options requires the string to be wrapped around with `<!-- and -->`, the only reason I'm not 
including it below is because I used some very simply string matching and replace and as such will probably replace
the string too if I have it exactly as is):

- `Insert API Docs`: Will be replaced with the contents of TypeDoc.
- `Insert components`: Will be replaced with the contents of Vue-DocGen.

### package.json Version Sync
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

## API Docs

### Type Aliases

- [BuildArgs](README.md#buildargs)
- [EslintConfigsParams](README.md#eslintconfigsparams)
- [Handler](README.md#handler)
- [HandlerCreator](README.md#handlercreator)
- [PluginArgs](README.md#pluginargs)
- [RunEsLintPrettierParams](README.md#runeslintprettierparams)

### Variables

- [BASE\_JAVASCRIPT\_RULES](README.md#base_javascript_rules)
- [GENERAL\_FILES](README.md#general_files)

### Functions

- [appendFileExtensionForEsm](README.md#appendfileextensionforesm)
- [appendFileExtensionForImports](README.md#appendfileextensionforimports)
- [configureWithPossibleExtension](README.md#configurewithpossibleextension)
- [createCombinedPackageJsonDependencies](README.md#createcombinedpackagejsondependencies)
- [cssModification](README.md#cssmodification)
- [generateEslintConfigs](README.md#generateeslintconfigs)
- [generatePrettierConfigs](README.md#generateprettierconfigs)
- [generateViteConfigs](README.md#generateviteconfigs)
- [generateViteMultiFileLibConfigs](README.md#generatevitemultifilelibconfigs)
- [getCjsConfigs](README.md#getcjsconfigs)
- [getHtmlConfigs](README.md#gethtmlconfigs)
- [getJsConfigs](README.md#getjsconfigs)
- [getJsonConfigs](README.md#getjsonconfigs)
- [getTsConfigs](README.md#gettsconfigs)
- [getVueConfigs](README.md#getvueconfigs)
- [keepOnlyExistentPaths](README.md#keeponlyexistentpaths)
- [lintAndReformat](README.md#lintandreformat)
- [modifySourceContentsChain](README.md#modifysourcecontentschain)
- [replaceAliasWithTsconfigPaths](README.md#replacealiaswithtsconfigpaths)
- [runEslint](README.md#runeslint)
- [runPrettier](README.md#runprettier)
- [spawnCommand](README.md#spawncommand)
- [updatePackageJsonVersions](README.md#updatepackagejsonversions)

## Type Aliases

### BuildArgs

Ƭ **BuildArgs**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `cwd?` | `string` | The current working directory. Defaults to whatever value is returned by `process.cwd()`. |
| `debug?` | `boolean` | Set to true to output some debugging information while executing. Defaults to `false`. |
| `extensions?` | `string`[] | The list of file extensions to parse. Defaults to `[".ts"]`. |

#### Defined in

esbuild-plugins/modify-source-contents-chain.ts:5

___

### EslintConfigsParams

Ƭ **EslintConfigsParams**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `baseDir` | `string` | The base directory for your package. |
| `configureCjs?` | (`configs`: `Linter.ConfigOverride`) => `Linter.ConfigOverride` | If we need to override or extend the configurations for `.cjs` files, this handler can be provided. |
| `configureHtml?` | (`configs`: `Linter.ConfigOverride`) => `Linter.ConfigOverride` | If we need to override or extend the configurations for `.html` files, this handler can be provided. |
| `configureJs?` | (`configs`: `Linter.ConfigOverride`) => `Linter.ConfigOverride` | If we need to override or extend the configurations for `.js` files, this handler can be provided. |
| `configureJson?` | (`configs`: `Linter.ConfigOverride`) => `Linter.ConfigOverride` | If we need to override or extend the configurations for `.json` files, this handler can be provided. |
| `configureTs?` | (`configs`: `Linter.ConfigOverride`) => `Linter.ConfigOverride` | If we need to override or extend the configurations for `.ts` files, this handler can be provided. |
| `configureVue?` | (`configs`: `Linter.ConfigOverride`) => `Linter.ConfigOverride` | If we need to override or extend the configurations for `.vue` files, this handler can be provided. |
| `enable?` | (``"cjs"`` \| ``"html"`` \| ``"js"`` \| ``"json"`` \| ``"ts"`` \| ``"vue"``)[] | List of files to enable linting support for. |

#### Defined in

eslint.ts:16

___

### Handler

Ƭ **Handler**: (`args`: { `contents`: `string` ; `path`: `string`  }) => { `contents`: `string`  }

#### Type declaration

▸ (`args`): `Object`

Handler to be given the path of the file whose content is also given. It should return an object with the updated
contents before it is passed to the next handler.

##### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.contents` | `string` |
| `args.path` | `string` |

##### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `contents` | `string` |

#### Defined in

esbuild-plugins/modify-source-contents-chain.ts:26

___

### HandlerCreator

Ƭ **HandlerCreator**: (`args`: [`BuildArgs`](README.md#buildargs) & { `build`: `PluginBuild`  }) => [`Handler`](README.md#handler)

#### Type declaration

▸ (`args`): [`Handler`](README.md#handler)

Use to create the handler as part of the build step.

##### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`BuildArgs`](README.md#buildargs) & { `build`: `PluginBuild`  } |

##### Returns

[`Handler`](README.md#handler)

#### Defined in

esbuild-plugins/modify-source-contents-chain.ts:31

___

### PluginArgs

Ƭ **PluginArgs**: [`BuildArgs`](README.md#buildargs) & { `handlerCreators`: [`HandlerCreator`](README.md#handlercreator)[]  }

#### Defined in

esbuild-plugins/modify-source-contents-chain.ts:33

___

### RunEsLintPrettierParams

Ƭ **RunEsLintPrettierParams**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `dirs?` | `string`[] | List of directory glob patterns to run the linter on. |
| `extensions?` | `string`[] | List of file extensions to run the linter on. |
| `files?` | `string`[] | List of files to run the linter on. |

#### Defined in

misc.ts:5

## Variables

### BASE\_JAVASCRIPT\_RULES

• `Const` **BASE\_JAVASCRIPT\_RULES**: `Partial`<`Linter.RulesRecord`\>

Shared rules for `.cjs` and `.js` files.

#### Defined in

eslint/javascript-configs.ts:6

___

### GENERAL\_FILES

• `Const` **GENERAL\_FILES**: `string`[]

General list of files that most packages should have that we want to lint and format.

#### Defined in

misc.ts:25

## Functions

### appendFileExtensionForEsm

▸ **appendFileExtensionForEsm**(`args`): [`Handler`](README.md#handler)

This will append the file extension to the end of relative imports if we are building for ESM.

**`Deprecated`**

Just use `appendFileExtensionForImports` which will add it for both ESM and CJS since they'll end up
 needing it.

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`BuildArgs`](README.md#buildargs) & { `build`: `PluginBuild`  } |

#### Returns

[`Handler`](README.md#handler)

#### Defined in

esbuild-plugins/modify-source-contents-chain.ts:31

___

### appendFileExtensionForImports

▸ **appendFileExtensionForImports**(`args`): [`Handler`](README.md#handler)

This will append the file extension to the end of relative imports if we are building for ESM and CJS.

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`BuildArgs`](README.md#buildargs) & { `build`: `PluginBuild`  } |

#### Returns

[`Handler`](README.md#handler)

#### Defined in

esbuild-plugins/modify-source-contents-chain.ts:31

___

### configureWithPossibleExtension

▸ **configureWithPossibleExtension**(`baseConfigs`, `extender?`): `Linter.ConfigOverride`

Given the base configurations, if an extender function is provided, execute it to retrieve the extended
configurations.

#### Parameters

| Name | Type |
| :------ | :------ |
| `baseConfigs` | `ConfigOverride`<`RulesRecord`\> |
| `extender` | (`configs`: `ConfigOverride`<`RulesRecord`\>) => `ConfigOverride`<`RulesRecord`\> |

#### Returns

`Linter.ConfigOverride`

#### Defined in

eslint.ts:62

___

### createCombinedPackageJsonDependencies

▸ **createCombinedPackageJsonDependencies**(): `void`

Combine all the versions of the various given package.json files into one. Note that this will create a package.json
file that will simply write all dependencies into the "dependencies" block on the package.json.

#### Returns

`void`

#### Defined in

package-json-utils.ts:64

___

### cssModification

▸ **cssModification**(): `Plugin`

This plugin basically removes duplicate

**`Charset`**

tags in the final CSS file as well as remove those legacy IE hacks.

#### Returns

`Plugin`

#### Defined in

postcss-plugins/css-modification.ts:6

___

### generateEslintConfigs

▸ **generateEslintConfigs**(`configs`): `Linter.Config`

Generate the configurations to use for ESLint.

Note the following unique features while the configurations are generated:
- Configurations for *.ts files will inherit the plugins and rules set by the *.js configurations.
- Configurations for *.vue files will inherit the plugins, and rules set by the *.ts configurations.

#### Parameters

| Name | Type |
| :------ | :------ |
| `configs` | [`EslintConfigsParams`](README.md#eslintconfigsparams) |

#### Returns

`Linter.Config`

#### Defined in

eslint.ts:76

___

### generatePrettierConfigs

▸ **generatePrettierConfigs**(): `Config`

Get the default configurations for Prettier.

#### Returns

`Config`

#### Defined in

prettier.ts:8

___

### generateViteConfigs

▸ **generateViteConfigs**(): `UserConfig`

Get the default configurations for Vite.

#### Returns

`UserConfig`

#### Defined in

vite.ts:8

___

### generateViteMultiFileLibConfigs

▸ **generateViteMultiFileLibConfigs**(`entries?`): `Promise`<`UserConfig`\>

Get the default configurations for Vite if we want to generate individual files as part of a library export. This
will make it so that all the files referenced by the given `entries` will be generated using the same directory
structure as it is in the `src` folder. For Vue components, it will remove the `.vue` in the file extension. For the
extracted CSS from the Vue files, it will also place them in the same folder as the component itself.

#### Parameters

| Name | Type |
| :------ | :------ |
| `entries` | `string`[] |

#### Returns

`Promise`<`UserConfig`\>

#### Defined in

vite.ts:22

___

### getCjsConfigs

▸ **getCjsConfigs**(): `Linter.ConfigOverride`

Get the default configurations for `.cjs` files.

#### Returns

`Linter.ConfigOverride`

#### Defined in

eslint/javascript-configs.ts:14

___

### getHtmlConfigs

▸ **getHtmlConfigs**(): `Linter.ConfigOverride`

Get the default configurations for `.html` files.

#### Returns

`Linter.ConfigOverride`

#### Defined in

eslint/html-configs.ts:6

___

### getJsConfigs

▸ **getJsConfigs**(): `Linter.ConfigOverride`

Get the default configurations for `.js` files.

#### Returns

`Linter.ConfigOverride`

#### Defined in

eslint/javascript-configs.ts:33

___

### getJsonConfigs

▸ **getJsonConfigs**(): `Linter.ConfigOverride`

Get the default configurations for `.json` files.

#### Returns

`Linter.ConfigOverride`

#### Defined in

eslint/json-configs.ts:6

___

### getTsConfigs

▸ **getTsConfigs**(`jsConfigs`, `baseDir`): `Linter.ConfigOverride`

Get the default configurations for `.ts` files.

#### Parameters

| Name | Type |
| :------ | :------ |
| `jsConfigs` | `ConfigOverride`<`RulesRecord`\> |
| `baseDir` | `string` |

#### Returns

`Linter.ConfigOverride`

#### Defined in

eslint/typescript-configs.ts:7

___

### getVueConfigs

▸ **getVueConfigs**(`tsConfigs`): `Linter.ConfigOverride`

Get default configurations for `.vue` files.

#### Parameters

| Name | Type |
| :------ | :------ |
| `tsConfigs` | `ConfigOverride`<`RulesRecord`\> |

#### Returns

`Linter.ConfigOverride`

#### Defined in

eslint/vue-configs.ts:6

___

### keepOnlyExistentPaths

▸ **keepOnlyExistentPaths**(`paths`): `string`[]

Given a list of paths, remove files that doesn't exists.

#### Parameters

| Name | Type |
| :------ | :------ |
| `paths` | `string`[] |

#### Returns

`string`[]

#### Defined in

misc.ts:37

___

### lintAndReformat

▸ **lintAndReformat**(`dirs`, `extensions`, `files?`, `options?`): `Plugin`

Lint and reformat the code.

Note that this contains an escape hatch to linting so you can still "build" by including the environment variable
`DISABLE_LINTING`.

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

vite-plugins/lint-and-reformat.ts:69

___

### modifySourceContentsChain

▸ **modifySourceContentsChain**(`«destructured»`): `Plugin`

While esbuild allows you to add multiple handlers for its onLoad event, once one of the handler returns something,
the subsequent handlers will not run. That means we can't have multiple handlers that updates the source content.
This plugin allows for the possibility.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`PluginArgs`](README.md#pluginargs) |

#### Returns

`Plugin`

#### Defined in

esbuild-plugins/modify-source-contents-chain.ts:56

___

### replaceAliasWithTsconfigPaths

▸ **replaceAliasWithTsconfigPaths**(`args`): [`Handler`](README.md#handler)

This plugin allows the use of path aliases in TSConfig, and it will be replaced with the mapped value in the
generated output. This plugin makes use of simple string matching and replace so that it can still be fast. If you
want to use a plugin that is likely safer which actually parses the code and does the replacement, you can look at
the plugin available here: https://github.com/wjfei/esbuild-plugin-tsconfig-paths

**`Throws`**

Throws a `tsconfig-path#ConfigLoaderFailResult` If we cannot load the `tsconfig.json` file for this package.

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`BuildArgs`](README.md#buildargs) & { `build`: `PluginBuild`  } |

#### Returns

[`Handler`](README.md#handler)

#### Defined in

esbuild-plugins/modify-source-contents-chain.ts:31

___

### runEslint

▸ **runEslint**(`params`): `SpawnSyncReturns`<`Buffer`\>

Execute the command to run ESLint.

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`RunEsLintPrettierParams`](README.md#runeslintprettierparams) |

#### Returns

`SpawnSyncReturns`<`Buffer`\>

#### Defined in

eslint.ts:101

___

### runPrettier

▸ **runPrettier**(`params`): `SpawnSyncReturns`<`Buffer`\>

Execute the command to run Prettier.

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`RunEsLintPrettierParams`](README.md#runeslintprettierparams) |

#### Returns

`SpawnSyncReturns`<`Buffer`\>

#### Defined in

prettier.ts:26

___

### spawnCommand

▸ **spawnCommand**(`command`): `SpawnSyncReturns`<`Buffer`\>

Spawn the given command synchronously and passing along the current environment variables.

#### Parameters

| Name | Type |
| :------ | :------ |
| `command` | `string` |

#### Returns

`SpawnSyncReturns`<`Buffer`\>

#### Defined in

spawn.ts:6

___

### updatePackageJsonVersions

▸ **updatePackageJsonVersions**(): `void`

Retrieve all the versions from the source package.json and update the target package.json with the versions from the
source.

#### Returns

`void`

#### Defined in

package-json-utils.ts:171
