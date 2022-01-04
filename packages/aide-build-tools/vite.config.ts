import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import { GENERAL_FILES, lintAndReformat } from './lib';

export default defineConfig({
    plugins: [
        lintAndReformat(['./lib'], ['.ts'], [...GENERAL_FILES, './tsconfig.base.json'], { verifyTs: true }),
        dts({
            insertTypesEntry: true,
            logDiagnostics: true,
        }),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'lib/index.ts'),
            formats: ['cjs', 'es'],
            fileName: 'index',
        },
        rollupOptions: {
            external: ['child_process', 'path'],
        },
    },
});
