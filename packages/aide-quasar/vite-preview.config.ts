import {transformAssetUrls} from '@quasar/vite-plugin';
import {cssModification, generateViteConfigs, lintAndReformat} from '@ti-platform/aide-build-tools';
import vue from '@vitejs/plugin-vue';
import {resolve} from 'path';
import {defineConfig} from 'vite';

const configs = generateViteConfigs();

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue({
            template: { transformAssetUrls },
        }),

        lintAndReformat(['./src'], ['.ts', '.vue'], undefined, { verifyVueTs: true }),
    ],
    build: {
        ...configs.build!,
        assetsInlineLimit: 200000,
    },
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
        },
    },
    server: {
        fs: {
            strict: false
        }
    }
});
