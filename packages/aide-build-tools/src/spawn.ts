import { spawnSync } from 'child_process';

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
