import { defineConfig } from 'tsup';

export default defineConfig({
    bundle: false,
    dts: true,
    format: ['cjs'],
    entry: ['./src/**/*.ts'],
    outDir: './dist',
    treeshake: true,
    // target: 'es2018',
});
