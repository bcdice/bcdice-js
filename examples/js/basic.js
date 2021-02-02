/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */

// const { DynamicLoader } = require('bcdice');
const { DynamicLoader } = require('../../lib');

async function main() {
  const loader = new DynamicLoader();

  console.log(loader.listAvailableGameSystems().map(info => info.id));

  const GameSystem = await loader.dynamicLoad('Cthulhu7th');
  const result = GameSystem.eval('CC<=54');

  console.log(result && result.text);
}

main();
