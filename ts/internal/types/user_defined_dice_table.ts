
import { Hash } from '../opal';
import Result from './result';

export interface UserDefinedDiceTableInstance {
  $roll($kwargs?: Hash): Result;
  ['$valid?'](): boolean;
}

export interface UserDefinedDiceTableClass extends Function {
  $new(text: string): UserDefinedDiceTableInstance;
  $roll(text: string): Result;
}
