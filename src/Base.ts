import '../lib/i18n';
import '../lib/bcdice/arithmetic_evaluator';
import '../lib/bcdice/common_command';
import '../lib/bcdice/base';
import '../lib/bcdice/preprocessor';

import Opal from "./Opal";
import Result from "./Result";
import { RandomizerInstance } from './Randomizer';

export interface BaseInstance {
  $eval(): Result;
  randomizer: RandomizerInstance;
}
export interface BaseClass {
  $new(command: string): BaseInstance
}

const { Base } = Opal.module<{ Base: BaseClass }>(null, 'BCDice');
export default Base;
