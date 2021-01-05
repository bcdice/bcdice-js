import { RandomizerInstance } from './randomizer';
import Result from "./result";

export interface BaseInstance {
  $eval(): Result;
  randomizer: RandomizerInstance;
}
export interface BaseClass extends Function {
  ID: string;

  $new(command: string): BaseInstance;
  $eval(command: string): Result;
}
