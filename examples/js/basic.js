/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */

// const { DynamicLoader, Version } = require('bcdice');
const { DynamicLoader, Version } = require('../../lib');

async function main() {
  console.log('BCDice Version:', Version);

  const loader = new DynamicLoader();

  console.log(loader.listAvailableGameSystems().map(info => info.id));

  const GameSystem = await loader.dynamicLoad('Cthulhu7th');
  console.log(GameSystem.NAME);
  console.log(GameSystem.HELP_MESSAGE);

  const result = GameSystem.eval('CC<=54');

  console.log(result && result.text);
}

main();
