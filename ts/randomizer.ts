import BCDice from "./bcdice";
import '../lib/bcdice/randomizer';

export interface RandomizerInstance {
  rand_results: [number, number][];
  detailed_rand_results: any[];
  $random(sides: number): number;
}

export interface RandomizerClass {
  $new(): RandomizerInstance;
}

const { Randomizer } = BCDice;
export default Randomizer;
