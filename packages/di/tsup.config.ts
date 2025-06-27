import {
    appendFileExtensionForImports,
    modifySourceContentsChain,
    replaceAliasWithTsconfigPaths,
} from '@ti-platform/aide-build-tools';
import { defineConfig } from 'tsup';

export default defineConfig({
    bundle: false,
    dts: true,
    format: ['cjs', 'esm'],
    entry: ['./src/**/*', '!./src/**/*.spec.ts'],
    outDir: './dist',
    treeshake: true,
    target: 'es2020',
    esbuildPlugins: [
        modifySourceContentsChain({
            handlerCreators: [replaceAliasWithTsconfigPaths, appendFileExtensionForImports],
        }),
    ],
});
