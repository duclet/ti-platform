# Change Log - @ti-platform/aide-build-tools

This log was last generated on Wed, 24 Jul 2024 18:55:35 GMT and should not be manually modified.

## 3.1.3
Wed, 24 Jul 2024 18:55:35 GMT

### Patches

- Fix to better output API docs.

## 3.1.2
Thu, 16 May 2024 18:49:59 GMT

### Patches

- Adding site info.

## 3.1.1
Thu, 16 May 2024 18:34:08 GMT

### Patches

- Improve formatting of generated docs.

## 3.1.0
Thu, 04 Apr 2024 15:51:52 GMT

### Minor changes

- Update ESLint configs to ensure no duplicates of imports.
- Update update-package-json-versions binary to allow specifying the target path as a glob pattern or array.

## 3.0.0
Mon, 01 Apr 2024 01:31:07 GMT

### Breaking changes

- Update dependencies.
- Renamed some of the types; Change the placeholder text for the documentation generator.

### Minor changes

- Update ESLint configurations.

## 2.1.1
Fri, 14 Jul 2023 20:31:34 GMT

### Patches

- Exporting all dependencies used

## 2.1.0
Fri, 14 Jul 2023 20:03:39 GMT

### Minor changes

- Adding new tools to help sync package.json dependencies versions across different packages.

### Patches

- Fixing code after updating dependencies.

## 2.0.0
Wed, 12 Jul 2023 20:01:30 GMT

### Breaking changes

- Targeting ES2020 as well as changing the exported file types.

### Patches

- Deprecates the plugin that adds the file extension only for ESM in favor of one that supports both ESM and CJS.

## 1.0.0
Mon, 10 Jul 2023 10:01:02 GMT

### Breaking changes

- Removing what should be unused methods that was mistakenly exported.

### Minor changes

- Adding esbuild plugin to allow for chaining of modifying the source before transforming.
- Adding esbuild plugin to appending the file extension when generating ESM builds.
- Adding esbuild plugin to replace aliases with relative paths.
- Adding base Vite configs for generating multiple files in library mode.

## 0.11.0
Thu, 22 Jun 2023 19:39:21 GMT

### Minor changes

- Upgrading configurations and adding new consistency ESLint rules

## 0.10.0
Tue, 15 Nov 2022 19:59:59 GMT

### Minor changes

- Change run-typedoc binary to allow parameterized input and support for generating Vue's components

## 0.9.0
Wed, 19 Oct 2022 18:53:48 GMT

### Minor changes

- When linting, filters out non-existent files if they are given

## 0.8.0
Fri, 09 Sep 2022 19:08:12 GMT

### Minor changes

- Adding new tool to generate API documentation and adding it to README file.

## 0.7.4
Mon, 28 Feb 2022 20:13:03 GMT

### Patches

- Update dependencies versions

## 0.7.3
Thu, 03 Feb 2022 19:05:11 GMT

### Patches

- Add documentation

## 0.7.2
Thu, 03 Feb 2022 18:27:49 GMT

### Patches

- Some cleanup

## 0.7.1
Tue, 18 Jan 2022 21:27:24 GMT

### Patches

- Upgrade dependencies

## 0.7.0
Sun, 16 Jan 2022 18:29:48 GMT

### Minor changes

- Add ability to skip linting and go straight to watch mode

## 0.6.2
Sun, 16 Jan 2022 18:00:35 GMT

### Patches

- Another try at correctly distributing binaries
- Build before publishing

## 0.6.1
Sun, 16 Jan 2022 15:01:33 GMT

### Patches

- Properly publish binaries

## 0.6.0
Sun, 16 Jan 2022 14:12:56 GMT

### Minor changes

- Add binaries for linting

## 0.5.0
Thu, 13 Jan 2022 01:26:40 GMT

### Minor changes

- Extract some functions to their own file and export it

## 0.4.0
Fri, 07 Jan 2022 20:29:38 GMT

### Minor changes

- Move a dependency to be a production dependency
- Add ability to load NPM_AUTH_TOKEN from local .env file first

## 0.3.0
Fri, 07 Jan 2022 16:14:19 GMT

### Minor changes

- Add bash scripts to help run some rush commands

## 0.2.0
Fri, 07 Jan 2022 14:59:03 GMT

### Minor changes

- Add scripts to help with some Rush commands and make sure @ti-platform/aide-build-tools contains all the necessary exported files

## 0.1.0
Thu, 06 Jan 2022 16:28:40 GMT

### Minor changes

- Initial addition of shared configurations for ESLint, Prettier, TypeScript, and Vite

