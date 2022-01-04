require('esbuild-register');

const { generateEslintConfigs } = require('./lib/eslint');

module.exports = generateEslintConfigs({ baseDir: __dirname, enable: ['cjs', 'json', 'ts'] });
