import { transformAssetUrls } from '@quasar/vite-plugin';
import {
    cssModification,
    GENERAL_FILES,
    generateViteMultiFileLibConfigs,
    lintAndReformat,
} from '@ti-platform/aide-build-tools';
import vue from '@vitejs/plugin-vue';
import { join } from 'path';
import { defineConfig } from 'vite';
import dtsPlugin from 'vite-plugin-dts';

const configs = await generateViteMultiFileLibConfigs();

// https://vitejs.dev/config/
export default defineConfig({
    ...configs,
    plugins: [
        vue({
            template: { transformAssetUrls },
        }),

        dtsPlugin({
            include: ['./src/**/*.ts', './src/**/*.vue'],
            exclude: ['./src/preview/**/*', './src/**/*.docs.ts'],
        }),

        lintAndReformat(['./src'], ['.ts', '.vue'], [...GENERAL_FILES, 'vite-preview.config.ts'], {
            verifyVueTs: true,
        }),
    ],
    css: {
        postcss: { plugins: [cssModification()] },
    },
    resolve: {
        alias: {
            // IntelliJ uses the Webpack style of prefixing with ~ for SCSS imports but Vite just use straight out
            // module name which is what Webpack is moving towards. So until IntelliJ fixes this, we'll need to
            // alias the libs that we use from our SCSS
            '~@quasar/extras': '@quasar/extras',
            '~quasar': 'quasar',
            '@src': join(__dirname, 'src'),
            '~@src': join(__dirname, 'src'),
        },
    },
});
