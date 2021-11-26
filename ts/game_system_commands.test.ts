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
    secret?: boolean;
    success?: boolean;
    failure?: boolean;
    critical?: boolean;
    fumble?: boolean;
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
    (testData as TestDataType)[id].test.map((data) => {
      const test = {
        ...data,
        output: data.output === '' ? undefined : data.output,
        secret: data.secret ?? false,
        success: data.success ?? false,
        failure: data.failure ?? false,
        critical: data.critical ?? false,
        fumble: data.fumble ?? false,
      };

      const loader = new DynamicLoader();

      it('should be valid GameSystem', async () => {
        const loader = new DynamicLoader();
        const GameSystemClass = await loader.dynamicLoad(test.game_system);

        expect(GameSystemClass.ID).is.not.empty;
        expect(GameSystemClass.NAME).is.not.empty;
        expect(GameSystemClass.SORT_KEY).is.not.empty;
        expect(GameSystemClass.HELP_MESSAGE).is.not.empty;
        expect(GameSystemClass.COMMAND_PATTERN).exist;

        switch (id) {
          case 'AddDice':
          case 'calc':
          case 'choice':
          case 'dummyBot':
          case 'Misonzai':
          case 'None':
          case 'Repeat':
          case 'tally_ty':
          case 'tally_tz':
          case 'UpperDice':
            expect(GameSystemClass.ID).to.equals('DiceBot');
            break;
          case 'tally_sort':
            break;
          default:
            expect(GameSystemClass.ID?.replace(/[^0-9A-Za-z_]/g, '_')?.replace(langPattern, '')).to.equal(id.replace(langPattern, '')); // ToDo: Language suffix
            break;
        }
      });

      it(`evals ${test.input} to ${test.output}`, async () => {
        const GameSystemClass = await loader.dynamicLoad(test.game_system);
        const gameSystem = new GameSystemClass(test.input);

        const $random = mockRandomizer(gameSystem);
        test.rands.forEach(({ value }, i) => {
          $random.onCall(i).returns(value);
        });
        $random.onCall(test.rands.length).throwsException(new Error('Unexpected call for $random'));

        const res = gameSystem.eval();

        if (!res) {
          expect(test.output).is.undefined;
          return;
        }

        expect(res.text).to.equal(test.output);
        expect(res.secret).to.equal(test.secret);
        expect(res.success).to.equal(test.success);
        expect(res.failure).to.equal(test.failure);
        expect(res.critical).to.equal(test.critical);
        expect(res.fumble).to.equal(test.fumble);
        expect(test.input).to.match(GameSystemClass.COMMAND_PATTERN);
      });
    });
  });
});
