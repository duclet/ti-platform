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

## API Docs
<!-- Insert API Docs -->
