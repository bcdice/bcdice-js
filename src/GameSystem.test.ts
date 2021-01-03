import { expect } from 'chai';
import Opal from './Opal';
import './Base';
import { mockRandomizer } from './testutils';
import TestData from '../lib/test/data.json';

type TestDataType = Record<string, {
  test: {
    game_system: string;
    input: string;
    output: string;
    rands: {
      sides: number,
      value: number,
    }[];
  }[];
}>;

Object.keys(TestData).forEach(id => {
  describe(id, () => {
    (TestData as TestDataType)[id].test.map((test, i) => {
      const game_system = test.game_system.replace(/[:\.]/g, '_');
      const output = test.output === '' ? undefined : test.output;

      it(`evals ${test.input} to ${output}`, () => {
        require(`../lib/bcdice/game_system/${game_system}`);

        const system = Opal.module<any>(null, 'BCDice').GameSystem[game_system].$new(test.input);

        var $random = mockRandomizer(system);
        test.rands.forEach(({ value }, i) => {
          $random.onCall(i).returns(value);
        });
        const res = system.$eval();

        expect(res.text).to.equal(output);
      });
    });
  });
});
