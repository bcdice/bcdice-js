import Base from '../base';
import { BaseClass, BaseInstance } from '../internal/types/base';
import { BCDice, I18n } from '../internal';
import Result, { parseResult } from '../result';
import GameSystemList, { GameSystemInfo } from '../../lib/bcdice/game_system_list.json';
import I18nList, { I18nInfo } from '../../lib/bcdice/i18n_list.json';
import GameSystemClass from '../game_system';

export type I18nJsonObject = Record<string, unknown>;

export function getGameSystemClass(gameSystemClass: BaseClass): GameSystemClass {
  return class extends Base {
    static readonly ID = gameSystemClass.$const_get('ID');
    static readonly NAME = gameSystemClass.$const_get('NAME');
    static readonly SORT_KEY = gameSystemClass.$const_get('SORT_KEY');
    static readonly HELP_MESSAGE = gameSystemClass.$const_get('HELP_MESSAGE');
    static readonly COMMAND_PATTERN = gameSystemClass.$command_pattern();

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

  getI18nInfo(className: string): I18nInfo | null {
    const baseClassName = className.replace(/_[^0-9].*$/g, '');
    const i18n = this.listAvailabletI18nInfoList().find(i18n => i18n.baseClassName === baseClassName) ?? null;
    return i18n;
  }

  listLoadedGameSystems(): GameSystemClass[] {
    return BCDice.GameSystem
      ?.$constants()
      ?.map(className => getGameSystemClass(BCDice.GameSystem[className])) ?? [];
  }

  listAvailableGameSystems(): GameSystemInfo[] {
    return GameSystemList.gameSystems;
  }

  listAvailabletI18nInfoList(): I18nInfo[] {
    return I18nList.i18nList;
  }

  async dynamicLoad(id: string): Promise<GameSystemClass> {
    const info = this.getGameSystemInfo(id);
    const className = info?.className ?? id;
    if (!className.match(/^[A-Z]\w*$/)) throw new Error('Invalid id');

    const i18nInfo = this.getI18nInfo(className);
    if (i18nInfo) {
      const locales = i18nInfo.locales.filter(locale => locale === info.locale || locale === I18n.$default_locale());
      for (const locale of locales) {
        const json = JSON.stringify(await this.dynamicImportI18n(i18nInfo.baseClassName, locale));
        I18n.$load_translation(json);
      };
    }

    await this.dynamicImport(className);

    const gameSystemClass = BCDice.GameSystem.$const_get<BaseClass>(className);
    if (!gameSystemClass) throw new Error('Failed to load game system');

    return getGameSystemClass(gameSystemClass);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dynamicImportI18n(baseClassName: string, locale: string): Promise<I18nJsonObject> {
    throw new Error('Not implemented');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dynamicImport(className: string): Promise<void> {
    throw new Error('Not implemented');
  }
}
