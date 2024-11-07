import { appendFileExtensionForImports } from '@src/esbuild-plugins';
import { replaceAliasWithTsconfigPaths } from '@src/esbuild-plugins/handler-creators/replace-alias-with-tsconfig-paths';
import { modifySourceContentsChain } from '@src/esbuild-plugins/modify-source-contents-chain';
import { defineConfig } from 'tsup';

export default defineConfig({
    bundle: false,
    dts: true,
    format: ['cjs', 'esm'],
    entry: ['./src/**/*.ts'],
    outDir: './dist',
    treeshake: true,
    target: 'es2020',
    esbuildPlugins: [
        modifySourceContentsChain({
            handlerCreators: [replaceAliasWithTsconfigPaths, appendFileExtensionForImports],
        }),
    ],
});
