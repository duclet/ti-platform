import { lintAndReformat } from '@ti-platform/aide-build-tools';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        lintAndReformat(['./src'], ['.ts'], undefined, { verifyTs: true }),
        dts({
            insertTypesEntry: true,
            logDiagnostics: true,
        }),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            formats: ['es'],
            fileName: 'index',
        },
    },
});
