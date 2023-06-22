import { type ModuleFormat } from 'rollup';
import { defineConfig, type UserConfig } from 'vite';
import dts from 'vite-plugin-dts';

export function getLibraryFilename(format: ModuleFormat) {
    if (format === 'cjs') {
        return 'index.cjs';
    }

    return 'index.js';
}

export function isLibraryExternalDep(source: string) {
    return !(source.startsWith('./') || source.startsWith('../') || source.startsWith('/'));
}

export function generateViteConfigs() {
    return defineConfig({
        plugins: [dts({ insertTypesEntry: true })],
        build: {
            minify: process.env.NODE_ENV === 'production' ? 'esbuild' : false,
        },
    }) as UserConfig;
}
