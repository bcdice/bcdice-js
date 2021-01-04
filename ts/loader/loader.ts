import { BaseClass } from "../base";
import BCDice from "../bcdice";

export default class Loader {
  game_system_class(id: string): BaseClass {
    const gameSystem = this.all_game_systems().find(a => a.ID === id);
    if (!gameSystem) throw new Error(`GameSystem ${id} is not loaded`);
    return gameSystem;
  }

  all_game_systems(): BaseClass[] {
    return BCDice.GameSystem?.$constants()?.map(className => BCDice.GameSystem[className]) ?? [];
  }

  async dynamic_load(className: string): Promise<BaseClass> {
    if (!className.match(/^[A-Z]\w*$/)) throw new Error('Invalid class name');

    await this.dynamic_import(`../../lib/bcdice/game_system/${className}`);

    const gameSystem = BCDice.GameSystem.$const_get<BaseClass>(className);
    if (!gameSystem) throw new Error('Failed to load game system');

    return gameSystem;
  }

  dynamic_import(path: string): Promise<void> {
    throw new Error('Not implemented');
  }
}
