import { generateEslintConfigs } from '@ti-platform/aide-build-tools';

export default generateEslintConfigs({
    baseDir: import.meta.dirname,
    enable: ['js', 'json', 'ts'],
    configureTs: (configs) => {
        configs.rules!['@typescript-eslint/no-unsafe-return'] = 'off';
        return configs;
    },
});
