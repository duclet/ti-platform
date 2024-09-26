import { generateViteConfigs } from '@ti-platform/aide-build-tools';
import { defu } from 'defu';
import type { UserConfig } from 'vite';
import { defineConfig } from 'vite';

import baseConfigs from './vite-base.config';

const tiPlatformConfigs = generateViteConfigs();

// https://vitejs.dev/config/
export default defineConfig(
    defu<UserConfig, Array<UserConfig>>(tiPlatformConfigs, baseConfigs, {
        build: {
            assetsInlineLimit: 200000,
        },
        server: {
            fs: {
                strict: false,
            },
        },
    })
);
