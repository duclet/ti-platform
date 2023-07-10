import { modifySourceContentsChain } from '@src/esbuild-plugins/modify-source-contents-chain';
import { replaceAliasWithTsconfigPaths } from '@src/esbuild-plugins/replace-alias-with-tsconfig-paths';
import { defineConfig } from 'tsup';

export default defineConfig({
    bundle: false,
    dts: true,
    format: ['cjs'],
    entry: ['./src/**/*.ts'],
    outDir: './dist',
    treeshake: true,
    target: 'es2018',
    esbuildPlugins: [
        modifySourceContentsChain({
            handlerCreators: [replaceAliasWithTsconfigPaths],
        }),
    ],
});
