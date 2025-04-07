require('esbuild-register');

const { generateEslintConfigs } = require('./src/eslint');

module.exports = generateEslintConfigs({ baseDir: __dirname, enable: ['cjs', 'json', 'ts'] });
