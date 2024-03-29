import { cssModification, GENERAL_FILES, lintAndReformat } from '@ti-platform/aide-build-tools';
import vue from '@vitejs/plugin-vue';
import { join } from 'path';
import { defineConfig, type UserConfig } from 'vite';

export default defineConfig({
    plugins: [
        vue(),
        lintAndReformat(
            ['./src'],
            ['.ts', '.vue'],
            [...GENERAL_FILES, 'vite-base.config.ts', 'vite-preview.config.ts'],
            { verifyVueTs: true }
        ),
    ],
    build: {
        target: 'es2020',
    },
    css: {
        postcss: { plugins: [cssModification()] },
    },
    resolve: {
        alias: { '@src': join(__dirname, 'src') },
    },
}) as UserConfig;
