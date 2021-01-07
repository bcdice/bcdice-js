import '../lib/bcdice/user_defined_dice_table';

import { UserDefinedDiceTableInstance } from './internal/types/user_defined_dice_table';
import {BCDice, Opal} from './internal';
import { RandomizerInstance } from './internal/types/randomizer';
import Result, { parseResult } from './result';

export default class UserDefinedDiceTable {
  private readonly internal: UserDefinedDiceTableInstance;

  constructor(text: string, internal?: UserDefinedDiceTableInstance) {
    this.internal = internal ?? BCDice.UserDefinedDiceTable.$new(text);
  }

  roll(randomizer?: RandomizerInstance): Result | null {
    const result = this.internal.$roll(randomizer && Opal.hash({ randomizer }));
    return parseResult(result);
  }

  validate(): boolean {
    return this.internal['$valid?']();
  }
}
