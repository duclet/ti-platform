import {
    appendFileExtensionForImports,
    modifySourceContentsChain,
    replaceAliasWithTsconfigPaths,
} from '@ti-platform/aide-build-tools';
import { defineConfig } from 'tsup';

export default defineConfig({
    bundle: false,
    dts: true,
    format: ['esm'],
    entry: ['./src/**/*'],
    outDir: './dist',
    treeshake: true,
    target: 'es2020',
    esbuildPlugins: [
        modifySourceContentsChain({
            handlerCreators: [replaceAliasWithTsconfigPaths, appendFileExtensionForImports],
        }),
    ],
});
