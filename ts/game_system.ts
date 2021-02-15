import Base from './base';
import { BaseInstance } from './internal/types/base';
import Result from './result';

/**
 * Definition of class of GameSystem
 **/
export default interface GameSystemClass {
  ID: string;
  NAME: string;
  SORT_KEY: string;
  HELP_MESSAGE: string;

  new (command: string, internal?: BaseInstance): Base;
  eval(command: string): Result | null;
}
