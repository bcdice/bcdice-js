import path from 'path';
import fs from 'fs';
import { parse } from 'toml';
import Opal from './Opal';
import { mockRandomizer } from './testutils';
import { expect } from 'chai';

// describe('GameSystem', () => {
//   it('can be imported', async () => {
//     await import('../lib/bcdice/game_system');
//   });
// });

const dataDir = path.join(__dirname, '../BCDice/test/data');
const ext = '.toml';
const testDataList = (fs.readdirSync(dataDir)).filter(a => a.endsWith(ext));

testDataList.forEach(filename => {
  const dataPath = path.join(dataDir, filename);
  const name = filename.slice(0, -ext.length);

  describe(name, () => {
    const toml = fs.readFileSync(dataPath).toString();
    const data = parse(toml.toString()) as {
      test: {
        game_system: string;
        input: string;
        output: string;
        rands: {
          sides: number,
          value: number,
        }[];
      }[];
    };

    data.test.forEach((test, i) => {
      it(`evals ${test.input} with ${test.game_system}`, async () => {
        await import(`../lib/bcdice/game_system/${test.game_system}`);

        const system = Opal.module<any>(null, 'BCDice').GameSystem[test.game_system].$new(test.input);
        var $random = mockRandomizer(system);
        test.rands.forEach(({ value }, i) => {
          $random.onCall(i).returns(value);
        });
        const res = system.$eval();
        expect(res.text).to.equal(test.output);
      });
    });
  });
});
