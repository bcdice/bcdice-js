import { BaseClass } from "../base";
import Loader from "./loader";

export default class ESModuleLoader extends Loader {
  async dynamic_import(path: string): Promise<void> {
    await import(path);
  }
}
