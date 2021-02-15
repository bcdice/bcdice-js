// import { DynamicLoader } from 'bcdice';
import { DynamicLoader } from '../../lib';

async function main(): Promise<void> {
  const loader = new DynamicLoader();

  console.log(loader.listAvailableGameSystems().map(info => info.id));

  const GameSystem = await loader.dynamicLoad('Cthulhu7th');
  console.log(GameSystem.NAME);
  console.log(GameSystem.HELP_MESSAGE);

  const result = GameSystem.eval('CC<=54');

  console.log(result?.text);
}

main();
