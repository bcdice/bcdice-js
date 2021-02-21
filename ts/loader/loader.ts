import Base from '../base';
import { BaseClass, BaseInstance } from '../internal/types/base';
import { BCDice } from '../internal';
import Result, { parseResult } from '../result';
import GameSystemList, { GameSystemInfo } from '../../lib/bcdice/game_system_list.json';
import GameSystemClass from '../game_system';

function getGameSystemClass(gameSystemClass: BaseClass): GameSystemClass {
  return class extends Base {
    static readonly ID = gameSystemClass.$const_get('ID');
    static readonly NAME = gameSystemClass.$const_get('NAME');
    static readonly SORT_KEY = gameSystemClass.$const_get('SORT_KEY');
    static readonly HELP_MESSAGE = gameSystemClass.$const_get('HELP_MESSAGE');

    static eval(command: string): Result | null {
      return parseResult(gameSystemClass.$eval(command));
    }

    constructor(command: string, internal?: BaseInstance) {
      super(command, internal ?? gameSystemClass.$new(command));
    }
  };
}

export default class Loader {
  getGameSystemIdByName(name: string): string {
    const id = this.listAvailableGameSystems().find(info => info.name === name)?.id;
    if (!id) throw new Error(`GameSystem named ${name} does not exists`);
    return id;
  }

  getGameSystemInfo(id: string): GameSystemInfo {
    const info = this.listAvailableGameSystems().find(info => info.id === id);
    if (!info) throw new Error('GameSystem is not found');

    return info;
  }

  getGameSystemClass(id: string): GameSystemClass {
    const gameSystem = this.listLoadedGameSystems().find(a => a.ID === id);
    if (!gameSystem) throw new Error(`GameSystem ${id} is not loaded`);
    return gameSystem;
  }

  listLoadedGameSystems(): GameSystemClass[] {
    return BCDice.GameSystem
      ?.$constants()
      ?.map(className => getGameSystemClass(BCDice.GameSystem[className])) ?? [];
  }

  listAvailableGameSystems(): GameSystemInfo[] {
    return GameSystemList.gameSystems;
  }

  async dynamicLoad(id: string): Promise<GameSystemClass> {
    const className = this.getGameSystemInfo(id)?.className ?? id;
    if (!className.match(/^[A-Z]\w*$/)) throw new Error('Invalid id');

    await this.dynamicImport(className);

    const gameSystemClass = BCDice.GameSystem.$const_get<BaseClass>(className);
    if (!gameSystemClass) throw new Error('Failed to load game system');

    return getGameSystemClass(gameSystemClass);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dynamicImport(className: string): Promise<void> {
    throw new Error('Not implemented');
  }
}
