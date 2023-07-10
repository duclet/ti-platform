import { runLinter } from '@src/lint-utils';
import { runPrettier } from '@src/prettier';

/**
 * Lint code using Prettier.
 */
runLinter('run-prettier', runPrettier);
