import { expect } from 'chai';
import fs from 'fs';
import path from 'path';
import Opal from './opal';
import './base';
import { mockRandomizer } from './test_utils';

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

const testData = JSON.parse(fs.readFileSync(path.join(__dirname, '../lib/bcdice/test_data.json')).toString());
Object.keys(testData).forEach(id => {
  describe(id, () => {
    (testData as TestDataType)[id].test.map((test, i) => {
      const game_system = test.game_system.replace(/[:\.]/g, '_');
      const output = test.output === '' ? undefined : test.output;

      it(`evals ${test.input} to ${output}`, () => {
        require(`../lib/bcdice/game_system/${game_system}`);

        const system = Opal.module<any>(null, 'BCDice').GameSystem[game_system].$new(test.input);

        var $random = mockRandomizer(system);
        test.rands.forEach(({ value }, i) => {
          $random.onCall(i).returns(value);
        });
        $random.onCall(test.rands.length).throwsException(new Error('Unexpected call for $random'));

        const res = system.$eval();

        expect(res.text).to.equal(output);
      });
    });
  });
});
