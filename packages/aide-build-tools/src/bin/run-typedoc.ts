import { spawnCommand } from '../spawn';

spawnCommand('pnpm typedoc --out ./docs --hideBreadcrumbs --readme ./base-readme.md ./src/index.ts');
spawnCommand('tail -n +5 ./docs/modules.md > ./docs/modules-with-header.md');
spawnCommand('sed -i -e "/<!-- Insert API Docs -->/r ./docs/modules-with-header.md" ./docs/README.md');
spawnCommand('sed -i -- "s/modules.md/README.md/g" ./docs/README.md');
spawnCommand('sed -i -- "s/<!-- Insert API Docs -->//g" ./docs/README.md');
spawnCommand('cp ./docs/README.md ./ && rm -rf ./docs');
