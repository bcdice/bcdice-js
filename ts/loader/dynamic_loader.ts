import Loader from './loader';

export default class DynamicLoader extends Loader {
  async dynamicImport(className: string): Promise<void> {
    await import(`../../lib/bcdice/game_system/${className}`);
  }
}
