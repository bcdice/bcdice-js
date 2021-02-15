import { RubyObject } from '../opal';
import { RandomizerInstance } from './randomizer';
import Result from './result';

export interface BaseInstance {
  $eval(): Result;
  randomizer: RandomizerInstance;
}
export interface BaseClass extends Function, RubyObject {
  $new(command: string): BaseInstance;
  $eval(command: string): Result;
}
