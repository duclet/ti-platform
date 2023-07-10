import { runEslint } from '@src/eslint';
import { runLinter } from '@src/lint-utils';

/**
 * Lint code via ESLint.
 */
runLinter('run-eslint', runEslint);
