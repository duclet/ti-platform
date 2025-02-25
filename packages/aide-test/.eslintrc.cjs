const { generateEslintConfigs } = require('@ti-platform/aide-build-tools');

module.exports = generateEslintConfigs({
    baseDir: __dirname,
    enable: ['cjs', 'json', 'ts'],
    configureTs: (configs) => {
        configs.rules['@typescript-eslint/no-unsafe-return'] = 'off';
        return configs;
    },
});
