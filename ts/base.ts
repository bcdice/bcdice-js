import '../lib/bcdice/arithmetic_evaluator';
import '../lib/bcdice/common_command';
import '../lib/bcdice/base';
import '../lib/bcdice/preprocessor';

import { BCDice } from './internal';
import { BaseInstance } from './internal/types/base';
import Result, { parseResult } from './result';
import { RandomizerInstance } from './internal/types/randomizer';

export default class Base {
  static eval(command: string): Result | null {
    const result = BCDice.Base.$eval(command);
    return parseResult(result);
  }

  private readonly internal: BaseInstance;

  get randomizer(): RandomizerInstance {
    return this.internal.randomizer;
  }

  constructor(command: string, internal?: BaseInstance) {
    this.internal = internal ?? BCDice.Base.$new(command);
  }

  eval(): Result | null {
    const result = this.internal.$eval();
    return parseResult(result);
  }
}
