import { BaseClass } from "./base";
import Opal, { Module } from "./opal";
import '../lib/bcdice/version';
import { GameSystemModule } from "./game_system";

export interface BCDiceModule extends Module {
  Base: BaseClass;
  GameSystem: GameSystemModule;
  VERSION: string;
}

const BCDice = Opal.module<BCDiceModule>(null, 'BCDice');
export default BCDice;
