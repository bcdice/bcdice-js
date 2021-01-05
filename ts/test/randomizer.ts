import Sinon, { SinonStub, stub } from "sinon";
import { BCDice } from "../internal";
import { RandomizerInstance } from "../internal/types/randomizer";

export function mockRandomizer(base: { randomizer: RandomizerInstance }): SinonStub<[number], number> {
  const $random = stub<[number], number>();
  Object.assign(base.randomizer, { $random });
  return $random;
}

export function mockedRandomizer(rands?: [number, number][]): [RandomizerInstance, SinonStub<[number], number>] {
  const randomizer = BCDice.Randomizer.$new();
  const $random = mockRandomizer({ randomizer });

  if (rands) {
    rands.forEach((rand, index) => {
      $random.onCall(index).returns(rand[0]);
    });
  }

  return [randomizer, $random];
}
