import { generateViteMultiFileLibConfigs } from '@ti-platform/aide-build-tools';
import { defu } from 'defu';
import { defineConfig, type UserConfig } from 'vite';
import dtsPlugin from 'vite-plugin-dts';

import baseConfigs from './vite-base.config';

const tiPlatformConfigs = await generateViteMultiFileLibConfigs();

// https://vitejs.dev/config/
export default defineConfig(
    defu<UserConfig, Array<UserConfig>>(
        {
            build: {
                rollupOptions: {
                    external: (source) => {
                        if (source.startsWith('primevue')) {
                            return true;
                        }

                        return (tiPlatformConfigs.build!.rollupOptions!.external! as Array<string>).includes(source);
                    },
                },
            },
            plugins: [
                dtsPlugin({
                    include: ['./src/**/*.ts', './src/**/*.vue'],
                    exclude: ['./src/preview/**/*', './src/**/*.docs.ts'],
                }),
            ],
        },
        baseConfigs,
        tiPlatformConfigs
    )
) as UserConfig;
