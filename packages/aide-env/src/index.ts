import { parse } from 'dotenv';
import { expand } from 'dotenv-expand';
import { accessSync, constants } from 'fs';
import { resolve } from 'path';
import { cwd, env } from 'process';

/**
 * Load the environment variables.
 */
export function loadEnv(filesOrder = ['.env', '.env.{NODE_ENV}', '.env.local']) {
    expand({
        parsed: filesOrder
            .map((file) => file.replaceAll('{NODE_ENV}', env.NODE_ENV as string))
            .map((file) => resolve(cwd(), file))
            .filter((path) => accessSync(path, constants.R_OK))
            .reduce((parsed, path) => Object.assign(parsed, parse(path)), {}),
    });
}
