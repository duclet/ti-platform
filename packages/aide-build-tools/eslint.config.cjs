require('esbuild-register');

// const { generateEslintConfigs } = require('./src/eslint');

// module.exports = generateEslintConfigs({ baseDir: __dirname, enable: ['cjs', 'json', 'ts'] });

const { config } = require('typescript-eslint');
const { getCjsConfigs } = require('./src/eslint/javascript-configs');
const { getJsConfigs } = require('./src/eslint/javascript-configs');
const { getJsonConfigs } = require('./src/eslint/json-configs');
const { getTsConfigs } = require('./src/eslint/typescript-configs');

module.exports = [
    config(getCjsConfigs()),
    config(getJsConfigs()),
    config(getJsonConfigs()),
    config(getTsConfigs(getJsConfigs(), __dirname)),
].flatMap((c) => c);
