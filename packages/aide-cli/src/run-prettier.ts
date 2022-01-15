import { runPrettier } from '@ti-platform/aide-build-tools';

import { runLinter } from './lint-utils';

runLinter('run-prettier', runPrettier);
