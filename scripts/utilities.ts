
import * as fs from 'fs';
import * as path from 'path';

export const libDir = path.join(__dirname, '../lib');
export const libDiceBotsDir = path.join(libDir, 'diceBot');
export const jsSrcDir = path.join(__dirname, '../src');
export const srcDir = path.join(__dirname, '../../BCDice/src');
export const diceBotsDir = path.join(srcDir, 'diceBot');
export const testDataDir = path.join(srcDir, 'test/data');

export async function getDiceBotSources(): Promise<string[]> {
  const files = await fs.promises.readdir(diceBotsDir);
  return files
    .filter(a => a.match(/\.rb$/) && !a.match(/(test|_[^/\\]*)\.rb$/))
    .map((filename) => path.join(diceBotsDir, filename));
}
