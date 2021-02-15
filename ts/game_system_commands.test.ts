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

const langPattern = /_(Korean)$/;

const testData = JSON.parse(fs.readFileSync(path.join(__dirname, '../lib/bcdice/test_data.json')).toString());
Object.keys(testData).forEach(id => {
  describe(id, () => {
    (testData as TestDataType)[id].test.map((test) => {
      const output = test.output === '' ? undefined : test.output;

      const loader = new DynamicLoader();

      it('should be valid GameSystem', async () => {
        const loader = new DynamicLoader();
        const GameSystemClass = await loader.dynamicLoad(test.game_system);

        expect(GameSystemClass.ID).is.not.empty;
        expect(GameSystemClass.NAME).is.not.empty;
        expect(GameSystemClass.SORT_KEY).is.not.empty;
        expect(GameSystemClass.HELP_MESSAGE).is.not.empty;

        switch (id) {
          case 'AddDice':
          case 'calc':
          case 'choice':
          case 'dummyBot':
          case 'Misonzai':
          case 'None':
          case 'Repeat':
          case 'UpperDice':
            expect(GameSystemClass.ID).to.equals('DiceBot');
            break;
          default:
            expect(GameSystemClass.ID?.replace(/[^0-9A-Za-z_]/g, '_')?.replace(langPattern, '')).to.equal(id.replace(langPattern, '')); // ToDo: Language suffix
            break;
        }
      });

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
