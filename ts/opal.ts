import { Hash } from 'crypto';
import '../lib/bcdice/opal';

export interface Module {
  $constants(): string[];
  $const_get<T>(name: string): T;
  $remove_const(name: string): void;
}
export interface Opal {
  require(path: string): boolean;
  module<M extends Module = Module>(parent?: string | null, name?: string): M;
  hash(obj: Record<string, unknown>): Hash;
  nil: any;
  Hash: unknown;
}

declare const Opal: Opal;
export default Opal;
