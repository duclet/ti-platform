import { parse } from 'dotenv';
import { expand } from 'dotenv-expand';
import { accessSync, constants, readFileSync } from 'fs';
import { resolve } from 'path';
import { cwd, env } from 'process';

/**
 * Load the environment variables.
 */
export function loadEnv(filesOrder = ['.env', '.env.{NODE_ENV}', '.env.local']) {
    expand({
        parsed: filesOrder
            .map((file) => file.replaceAll('{NODE_ENV}', env.NODE_ENV ?? 'development'))
            .map((file) => resolve(cwd(), file))
            .filter((path) => {
                try {
                    accessSync(path, constants.R_OK);
                    return true;
                } catch (e) {
                    return false;
                }
            })
            .reduce((parsed, path) => Object.assign(parsed, parse(readFileSync(path))), {}),
    });
}
