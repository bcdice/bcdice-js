import '../../lib/bcdice/opal';

export type Hash = unknown;

export interface RubyObject {
  $constants(): string[];
  $const_get<T>(name: string): T;
  $remove_const(name: string): void;
}

export type Module = RubyObject;

export interface Opal {
  require(path: string): boolean;
  module<M extends Module = Module>(parent?: string | null, name?: string): M;
  hash(obj: Record<string, unknown>): Hash;
  nil: Record<string, unknown>;
  Hash: Hash;
  config: Record<string, string>;
}

declare const Opal: Opal;
Opal.config.unsupported_features_severity = 'ignore';

export default Opal;

export function nilToNull<T>(value: T): T | null {
  return value === Opal.nil ? null : value;
}
