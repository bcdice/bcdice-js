import { SinonStub, stub } from "sinon";
import { BaseInstance } from "./base";
export function mockRandomizer(base: BaseInstance): SinonStub<[number], number> {
  const $random = stub<[number], number>();
  Object.assign(base.randomizer, { $random });
  return $random;
}
