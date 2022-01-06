import { resolve } from 'path';
import { defineConfig } from 'vite';

import { GENERAL_FILES, generateViteConfigs, getLibraryFilename, isLibraryExternalDep, lintAndReformat } from './lib';

const baseConfigs = generateViteConfigs();

export default defineConfig({
    plugins: [
        ...baseConfigs.plugins!,
        lintAndReformat(['./lib'], ['.ts'], [...GENERAL_FILES, './tsconfig.base.json'], { verifyTs: true }),
    ],
    build: {
        ...baseConfigs.build,
        lib: {
            entry: resolve(__dirname, 'lib/index.ts'),
            formats: ['cjs', 'es'],
            fileName: getLibraryFilename,
        },
        rollupOptions: {
            external: isLibraryExternalDep,
        },
    },
});
