import { generateEslintConfigs } from '@ti-platform/aide-build-tools';

export default generateEslintConfigs({ baseDir: import.meta.baseDir, enable: ['cjs', 'json', 'ts', 'vue'] });
