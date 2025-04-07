import tailwindcss from '@tailwindcss/vite';
import { GENERAL_FILES, lintAndReformat } from '@ti-platform/aide-build-tools';
import vue from '@vitejs/plugin-vue';
import { join } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        tailwindcss(),
        vue(),
        lintAndReformat(['./src'], ['.ts', '.vue'], GENERAL_FILES, {
            verifyVueTs: true,
        }),
    ],
    build: {
        target: 'es2020',
    },
    resolve: {
        alias: {
            '@src': join(import.meta.dirname, 'src'),
        },
    },
});
