import Loader from "./loader";

export default class CommonJSLoader extends Loader {
  async dynamic_import(path: string): Promise<void> {
    require(path);
  }
}
