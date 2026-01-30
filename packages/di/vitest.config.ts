import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        alias: {
            '@src': new URL('./src/', import.meta.url).pathname,
        },
        coverage: {
            include: ['src/**/*.ts'],
            exclude: ['src/index.ts'],
            provider: 'v8',
        },
    },
});
