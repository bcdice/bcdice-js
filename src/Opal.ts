import '../lib/bcdice/opal';

export interface Module {

}
export interface Opal {
  require(path: string): boolean;
  module<M extends Module = Module>(parent?: string | null, name?: string): M;
}

declare const Opal: Opal;
export default Opal;
