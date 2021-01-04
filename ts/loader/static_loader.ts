import Loader from "./loader";
import '../../lib/bcdice/game_system';

export default class StaticLoader extends Loader {
  async dynamic_import(path: string): Promise<void> {
  }
};
