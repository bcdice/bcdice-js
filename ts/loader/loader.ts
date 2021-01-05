import Base from "../base";
import { BaseClass, BaseInstance } from "../internal/types/base";
import { BCDice } from "../internal";
import Result, { parseResult } from "../result";

type GameSystemClassType = Function & {
  new (command: string, internal?: BaseInstance): Base;
  eval(command: string): Result | null;
  ID: string;
}

function getGameSystemClass(gameSystemClass: BaseClass): GameSystemClassType {
  return class extends Base {
    static readonly ID = gameSystemClass.ID;

    static eval(command: string): Result | null {
      return parseResult(gameSystemClass.$eval(command));
    }

    constructor(command: string, internal?: BaseInstance) {
      super(command, internal ?? gameSystemClass.$new(command));
    }
  };
}

export default class Loader {
  gameSystemClass(id: string): GameSystemClassType {
    const gameSystem = this.allGameSystems().find(a => a.ID === id);
    if (!gameSystem) throw new Error(`GameSystem ${id} is not loaded`);
    return gameSystem;
  }

  allGameSystems(): GameSystemClassType[] {
    return BCDice.GameSystem
      ?.$constants()
      ?.map(className => getGameSystemClass(BCDice.GameSystem[className])) ?? [];
  }

  async dynamicLoad(className: string): Promise<GameSystemClassType> {
    if (!className.match(/^[A-Z]\w*$/)) throw new Error('Invalid class name');

    await this.dynamicImport(`../../lib/bcdice/game_system/${className}`);

    const gameSystemClass = BCDice.GameSystem.$const_get<BaseClass>(className);
    if (!gameSystemClass) throw new Error('Failed to load game system');

    return getGameSystemClass(gameSystemClass);
  }

  dynamicImport(path: string): Promise<void> {
    throw new Error('Not implemented');
  }
}
