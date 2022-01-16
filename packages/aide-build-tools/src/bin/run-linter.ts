import { runEslint } from '../eslint';
import { runLinter } from '../lint-utils';
import { runPrettier } from '../prettier';

runLinter('run-linter', (args) => {
    const eslint = runEslint(args);
    if (eslint.status !== 0) {
        return eslint;
    }

    return runPrettier(args);
});
