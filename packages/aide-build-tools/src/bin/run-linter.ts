import { runEslint } from '@src/eslint';
import { runLinter } from '@src/lint-utils';
import { runPrettier } from '@src/prettier';

/**
 * Lint code using both ESLint and Prettier.
 */
runLinter('run-linter', (args) => {
    const eslint = runEslint(args);
    if (eslint.status !== 0) {
        return eslint;
    }

    return runPrettier(args);
});
