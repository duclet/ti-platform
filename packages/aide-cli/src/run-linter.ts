import { runEslint, runPrettier } from '@ti-platform/aide-build-tools';

import { runLinter } from './lint-utils';

runLinter('run-linter', (args) => {
    const eslint = runEslint(args);
    if (eslint.status !== 0) {
        return eslint;
    }

    return runPrettier(args);
});
