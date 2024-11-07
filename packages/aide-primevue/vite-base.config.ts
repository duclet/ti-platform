import { cssModification, GENERAL_FILES, lintAndReformat } from '@ti-platform/aide-build-tools';
import vue from '@vitejs/plugin-vue';
import autoprefixer from 'autoprefixer';
import { join } from 'path';
import tailwindcss from 'tailwindcss';
import TailwindPrimeUi from 'tailwindcss-primeui';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        vue(),
        lintAndReformat(['./src'], ['.ts', '.vue'], GENERAL_FILES, {
            verifyVueTs: true,
        }),
    ],
    build: {
        target: 'es2020',
    },
    css: {
        postcss: {
            plugins: [
                cssModification(),
                tailwindcss({
                    content: ['./src/**/*.{vue,ts}'],
                    theme: {
                        extend: {
                            colors: {
                                error: 'var(--p-form-field-invalid-border-color)',
                            },
                        },
                    },
                    plugins: [TailwindPrimeUi],
                }),
                autoprefixer(),
            ],
        },
    },
    resolve: {
        alias: {
            '@src': join(__dirname, 'src'),
        },
    },
});
