import { spawnSync } from 'child_process';

/**
 * Spawn the given command synchronously and passing along the current environment variables.
 */
export function spawnCommand(command: string) {
    console.log(command);
    const result = spawnSync(command, { env: process.env, shell: true, stdio: 'inherit' });

    if (result.status === 0) {
        console.log('Done.\n');
    } else {
        console.log('Execution failed.\n');
    }

    return result;
}
