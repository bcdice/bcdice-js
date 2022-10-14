import '../../lib/bcdice/version';

import Opal_, { Module } from './opal';
import { GameSystemModule } from './types/game_system';
import { UserDefinedDiceTableClass } from './types/user_defined_dice_table';
import { RandomizerClass } from './types/randomizer';
import { BaseClass } from './types/base';

export interface BCDiceModule extends Module {
  Base: BaseClass;
  GameSystem: GameSystemModule;
  Randomizer: RandomizerClass;
  UserDefinedDiceTable: UserDefinedDiceTableClass;
  VERSION: string;
}

export interface I18nModule extends Module {
  $load_translation(json: string): void;
  $default_locale(): string;
  $clear_translate_table(): void;
}

export const BCDice = Opal_.module<BCDiceModule>(null, 'BCDice');
export const I18n = Opal_.module<I18nModule>(null, 'I18n')
export { default as Opal } from './opal';
