import Loader from './loader';
import '../../lib/bcdice/game_system';

export default class StaticLoader extends Loader {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  async dynamicImport(path: string): Promise<void> {
  }
}
