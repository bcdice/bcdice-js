import '../../lib/bcdice/version';

import Opal, { Module } from "./opal";
import { GameSystemModule } from "./types/game_system";
import { UserDefinedDiceTableClass } from "./types/user_defined_dice_table";
import { RandomizerClass } from "./types/randomizer";
import { BaseClass } from "./types/base";

export interface BCDiceModule extends Module {
  Base: BaseClass;
  GameSystem: GameSystemModule;
  Randomizer: RandomizerClass;
  UserDefinedDiceTable: UserDefinedDiceTableClass;
  VERSION: string;
}

export const BCDice = Opal.module<BCDiceModule>(null, 'BCDice');
export { default as Opal } from './opal';
