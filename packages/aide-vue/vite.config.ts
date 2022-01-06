import { generateViteConfigs, getLibraryFilename, lintAndReformat } from '@ti-platform/aide-build-tools';
import { resolve } from 'path';
import { defineConfig } from 'vite';

const baseConfigs = generateViteConfigs();

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [...baseConfigs.plugins!, lintAndReformat(['./src'], ['.ts'], undefined, { verifyTs: true })],
    build: {
        ...baseConfigs.build,
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            formats: ['es'],
            fileName: getLibraryFilename,
        },
    },
});
