import { generateEslintConfigs } from '@ti-platform/aide-build-tools';

export default generateEslintConfigs({
    baseDir: import.meta.dirname,
    enable: ['cjs', 'html', 'js', 'json', 'ts', 'vue'],
});
