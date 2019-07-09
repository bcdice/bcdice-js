import * as fs from 'fs';
import { flatten } from 'lodash';
import * as path from 'path';
import { exec } from 'child_process';
import { getDiceBotSources, diceBotsDir, srcDir, libDir } from './utilities';

async function extractGames(): Promise<void> {
  await fs.promises.mkdir(libDir, { recursive: true });
  const diceBotSources = await getDiceBotSources();
  const diceBot = path.join(diceBotsDir, 'DiceBot.rb');
  const games = await Promise.all(
    diceBotSources
      .filter(a => !a.match('DiceBotLoader'))
      .map(src => new Promise((resolve, reject) => {
        const gameType = path.basename(src).replace(/\.rb$/, '');
        console.log('Extracting', gameType);

        const script = `b=${gameType}.new();p [b.gameName(), b.prefixes, b.getHelpMessage()]`;
        exec(`ruby -I ${srcDir} -r ${diceBot} -r ${src} -e "${script}"`, (error, stdout, stderr) => {
          if (stderr) console.error(error);
          if (error) {
            reject(error);
          } else {
            const [gameName, prefixes, help] = JSON.parse(stdout);
            resolve({
              gameType,
              gameName,
              prefixes: flatten(prefixes),
              help,
            });
          }
        });
      })),
  );
  await fs.promises.writeFile(path.join(libDir, 'diceBot.json'), JSON.stringify({ games }, null, 2));
}
extractGames().catch((e) => console.error(e));
