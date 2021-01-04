import '../lib/bcdice/common_command';
import '../lib/bcdice/base';
import '../lib/bcdice/preprocessor';

import Result from "./result";
import { RandomizerInstance } from './randomizer';
import BCDice from './bcdice';

export interface BaseInstance {
  $eval(): Result;
  randomizer: RandomizerInstance;
}
export interface BaseClass extends Function {
  ID: string;

  $new(command: string): BaseInstance
  $eval(command: string): Result
}

const { Base } = BCDice;
export default Base;
