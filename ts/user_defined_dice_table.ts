import { Opal } from "./opal";
import BCDice from "./bcdice";
import Result from "./result";
import '../lib/bcdice/user_defined_dice_table';

export interface UserDefinedDiceTableInstance {
  $roll($kwargs?: Opal['Hash']): Result;
  ['$valid?'](): boolean;
}

export interface UserDefinedDiceTableClass extends Function {
  $new(text: string): UserDefinedDiceTableInstance;
  $roll(text: string): Result;
}

const { UserDefinedDiceTable } = BCDice;
export default UserDefinedDiceTable;
