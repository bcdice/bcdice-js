import Loader from "./loader";

export default class CommonJSLoader extends Loader {
  async dynamicImport(path: string): Promise<void> {
    require(path);
  }
}
