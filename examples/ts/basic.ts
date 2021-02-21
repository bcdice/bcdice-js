// import { DynamicLoader, Version } from 'bcdice';
import { DynamicLoader, Version } from '../../lib';

async function main(): Promise<void> {
  console.log('BCDice Version:', Version);

  const loader = new DynamicLoader();

  console.log(loader.listAvailableGameSystems().map(info => info.id));

  const GameSystem = await loader.dynamicLoad('Cthulhu7th');
  console.log(GameSystem.NAME);
  console.log(GameSystem.HELP_MESSAGE);

  const result = GameSystem.eval('CC<=54');

  console.log(result?.text);
}

main();
