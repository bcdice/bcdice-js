import Loader, { I18nJsonObject } from './loader';
import I18nList from '../../lib/bcdice/i18n_list.json';
import { I18n } from '../internal';

staticImport();

export default class StaticLoader extends Loader {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  async dynamicImportI18n(baseClassName: string, locale: string): Promise<I18nJsonObject> {
    return {};
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  async dynamicImport(className: string): Promise<void> {
  }
}

function staticImport() {
  I18nList.i18nList.forEach(I18nInfo => {
    I18nInfo.locales.forEach(locale => {
      const json = JSON.stringify(require(`../../lib/bcdice/i18n/${I18nInfo.baseClassName}.${locale}.json`));
      I18n.$load_translation(json);
    });
  });
  require('../../lib/bcdice/game_system');
}
