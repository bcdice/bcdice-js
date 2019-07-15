import * as fs from 'fs';
import * as path from 'path';
import { expect } from 'chai';
import BCDice from '..';

describe('DiceBots', () => {
  it('can load tests', async () => {
    const testDataDir = path.join(__dirname, '../BCDice/src/test/data');
    const testDataDirFiles = await fs.promises.readdir(testDataDir);
    const testDataList = await Promise.all(testDataDirFiles
      .filter(f => f.match(/^[^_].*\.txt$/))
      .map(async (f) => {
        const gameType = f.replace(/\.txt$/, '');
        const data = await fs.promises.readFile(path.join(testDataDir, f));
        return [gameType, data.toString()] as [string, string];
      }),
    );

    testDataList.forEach(([gameType, testData]) => {
      describe(gameType, () => {
        if (!gameType.match(/^(TestDummy|PlotTest|None|dummyBot|Misonzai)$/)) {
          it('can import', async () => {
            await import(`../lib/diceBot/${gameType}`);
          });
        }

        testData
          .replace(/\r/g, '') //TODO
          .split(/\n=+\n?/g)
          .filter(a => a !== '')
          .forEach((testCaseSrc,) => {
              const m = testCaseSrc.match(/input:((.|\n)*)?output:((.|\n)*)rand:((.|\n)*)/)

              const input = m ? m[1].trim() : '';
              const output = m ? m[3].trim() : '';
              const rands = m
                ? m[5].trim()
                  .split(/,/g)
                  .map(a => a.split(/\//g).map(b => Number(b.trim())))
                : [];

              it(`rolls ${input}`, () => {
                expect(m).not.to.be.null;

                const bcdice = new BCDice();
                bcdice.setRandomValues(rands);
                bcdice.setTest(true);

                const [message] = bcdice.roll(input, gameType, []);

                const surplusRands = bcdice.rands.map(r => r.join('/')).join(', ');

                const messageWithRands = (surplusRands && surplusRands !== '0')
                  ? `${message}ダイス残り：${surplusRands}`
                  : message;
                expect(messageWithRands.trim()).to.equal(output);
              });
            });
      });
    });
  });
});
