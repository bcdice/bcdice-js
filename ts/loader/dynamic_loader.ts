import Loader, { I18nJsonObject } from './loader';

export default class DynamicLoader extends Loader {
  async dynamicImportI18n(baseClassName: string, locale: string): Promise<I18nJsonObject> {
    return (await import(`../../lib/bcdice/i18n/${baseClassName}.${locale}.json`)).default as I18nJsonObject;
  }

  async dynamicImport(className: string): Promise<void> {
    await import(`../../lib/bcdice/game_system/${className}`);
  }
}
