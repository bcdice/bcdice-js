import { BaseClass } from "./base";
import Opal, { Module } from "./opal";
import '../lib/bcdice/version';
import { GameSystemModule } from "./game_system";
import { UserDefinedDiceTableClass } from "./user_defined_dice_table";
import { RandomizerClass } from "./randomizer";

export interface BCDiceModule extends Module {
  Base: BaseClass;
  GameSystem: GameSystemModule;
  Randomizer: RandomizerClass;
  UserDefinedDiceTable: UserDefinedDiceTableClass;
  VERSION: string;
}

const BCDice = Opal.module<BCDiceModule>(null, 'BCDice');
export default BCDice;
