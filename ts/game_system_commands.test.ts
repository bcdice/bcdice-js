import fs from 'fs';
import path from 'path';
import { expect } from 'chai';
import DynamicLoader from './loader/dynamic_loader';
import { mockRandomizer } from './test/randomizer';

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
    (testData as TestDataType)[id].test.map((test) => {
      const output = test.output === '' ? undefined : test.output;

      const loader = new DynamicLoader();
      it(`evals ${test.input} to ${output}`, async () => {
        const GameSystemClass = await loader.dynamicLoad(test.game_system);
        const gameSystem = new GameSystemClass(test.input);

        const $random = mockRandomizer(gameSystem);
        test.rands.forEach(({ value }, i) => {
          $random.onCall(i).returns(value);
        });
        $random.onCall(test.rands.length).throwsException(new Error('Unexpected call for $random'));

        const res = gameSystem.eval();

        expect(res?.text).to.equal(output);
      });
    });
  });
});
