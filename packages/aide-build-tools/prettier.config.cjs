require('esbuild-register');

const { generatePrettierConfigs } = require('./src/prettier');

module.exports = generatePrettierConfigs();
