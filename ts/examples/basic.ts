import { ESModuleLoader } from "../../lib";

async function main(): Promise<void> {
  const loader = new ESModuleLoader();

  const GameSystem = await loader.dynamicLoad('Cthulhu7th');
  const result = GameSystem.eval('CC<=54');

  console.log(result?.text);
}

main();
