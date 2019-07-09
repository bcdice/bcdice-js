import 'source-map-support/register';
import * as fs from 'fs';
import * as path from 'path';
import BCDice from '..';
import { testDataDir, libDir, libDiceBotsDir } from './utilities';

class TestFailure extends Error {
}

async function test(): Promise<void> {
  const diceBotFiles = (await fs.promises.readdir(libDiceBotsDir)).filter(file => file.match(/\.js$/));
  const dataFiles = (await fs.promises.readdir(testDataDir)).filter(file => file.match(/\.txt$/) && !file.match(/^_/));

  const bcdice = new BCDice();

  await dataFiles.reduce(async (p, dataFile) => {
    await p;

    const gameType = dataFile.replace(/\.txt$/, '');
    if (!diceBotFiles.includes(`${gameType}.js`)) return;

    process.stdout.write(`\n${gameType} `);

    require(path.join(libDiceBotsDir, `${gameType}.js`));

    (await fs.promises.readFile(path.join(testDataDir, dataFile)))
      .toString()
      .replace(/\r/g, '')
      .split(/\n=+\n?/g)
      .filter(a => a)
      .map(testData => testData.match(/input:((.|\n)*)?output:((.|\n)*)rand:((.|\n)*)/))
      .forEach((m, index) => {
        if (!m) return;

        const input = m[1].trim();
        const output = m[3].trim();
        const rands = m[5].trim().split(/,/g).map(a => a.split(/\//g).map(b => Number(b.trim())));

        bcdice.setRandomValues(rands);
        bcdice.setTest(true);

        const result = bcdice.roll(input, gameType, []);
        let resultMessage = result[0].trim();
        if (result[1]) console.log('result', result[1]);

        const surplusRands = bcdice.rands.map(r => r.join('/')).join(', ');
        if (surplusRands && surplusRands !== '0') resultMessage += `ダイス残り：${surplusRands}`;

        if (resultMessage !== output) {
          throw new TestFailure(JSON.stringify({
            match: m[0],
            input,
            output,
            rands,
            gameType,
            index,
            resultMessage,
            bcdice: {
              rands: bcdice.rands,
            },
          }, null, 2));
        }

        process.stdout.write('.');
      });
  }, Promise.resolve());
  process.stdout.write('\n');

  const { games } = BCDice;
  if (!Array.isArray(games)) throw new TestFailure();
  if (typeof games[0].gameType !== 'string') throw new TestFailure();
  if (typeof games[0].gameName !== 'string') throw new TestFailure();
}
test().catch(e => console.error(e));
