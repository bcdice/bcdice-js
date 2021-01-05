import Loader from "./loader";

export default class ESModuleLoader extends Loader {
  async dynamicImport(path: string): Promise<void> {
    await import(path);
  }
}
