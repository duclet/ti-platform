import { basename } from 'path';
import { readPackageJSON } from 'pkg-types';
import type { UserConfig } from 'vite';

/**
 * Get the default configurations for Vite.
 */
export async function generateViteConfigs(): Promise<UserConfig> {
    const { defineConfig } = await import('vite');

    return defineConfig({
        build: {
            minify: process.env.NODE_ENV === 'production' ? 'esbuild' : false,
        },
    });
}

/**
 * Get the default configurations for Vite if we want to generate individual files as part of a library export. This
 * will make it so that all the files referenced by the given `entries` will be generated using the same directory
 * structure as it is in the `src` folder. For Vue components, it will remove the `.vue` in the file extension. For the
 * extracted CSS from the Vue files, it will also place them in the same folder as the component itself.
 */
export async function generateViteMultiFileLibConfigs(
    entries: Array<string> = ['./src/index.ts']
): Promise<UserConfig> {
    const { defineConfig } = await import('vite');

    const assetsData = new Map<string, string>();
    const genericConfigs = await generateViteConfigs();
    const { dependencies } = await readPackageJSON();

    return defineConfig({
        build: {
            ...genericConfigs.build!,
            cssCodeSplit: true,
            lib: {
                formats: ['es'],
                name: '',
                entry: entries,
                fileName: (format, entryName) =>
                    entryName.endsWith('.vue') ? entryName.slice(0, -3) + 'js' : '[name].js',
            },
            rollupOptions: {
                external: Object.keys(dependencies ?? {}),
                output: {
                    preserveModules: true,
                    assetFileNames: (chunkInfo) => {
                        const name = chunkInfo.name!;
                        const bname = basename(name);
                        const key = bname.substring(0, bname.lastIndexOf('.'));

                        if (assetsData.has(key)) {
                            return assetsData.get(key)!;
                        }

                        // Vite will call this method twice for each asset, the first time has the full path but the
                        // second time will only contain the filename. Because we are only used scoped CSS, we can
                        // target against the scoped ID
                        assetsData.set(
                            key,
                            name.substring(name.indexOf('/') + 1, name.indexOf('?')).slice(0, -3) + '[ext]'
                        );
                        return assetsData.get(key)!;
                    },
                },
            },
        },
    });
}
