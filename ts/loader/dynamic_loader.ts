import Loader from "./loader";

export default class DynamicLoader extends Loader {
  async dynamicImport(path: string): Promise<void> {
    await import(path);
  }
}
