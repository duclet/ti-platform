require('esbuild-register');

const { generatePrettierConfigs } = require('./lib/prettier');

module.exports = generatePrettierConfigs();
