import * as fs from 'fs';
import * as path from 'path';

export const rootDir = path.join(__dirname, '..');
export const outputDir = path.join(rootDir, 'lib');
export const outputDiceBotDir = path.join(outputDir, 'diceBot');
export const srcDir = path.join(rootDir, 'src');

export const patchesDir = path.join(rootDir, 'patches');

export const patchedDir = path.join(rootDir, 'patched');
export const patchedDiceBotDir = path.join(patchedDir, 'diceBot');

export const bcdiceDir = path.join(rootDir, 'BCDice');
export const bcdiceSrcDir = path.join(bcdiceDir, 'src');
export const bcdiceTestDataDir = path.join(bcdiceSrcDir, 'test/data');

export async function getGameTypes(): Promise<string[]> {
  const files = await fs.promises.readdir(patchedDiceBotDir);
  return files
    .filter(file => file.match(/^[^_].*\.rb$/) && !file.match(/(DiceBotLoader(List)?|test)\.rb$/))
    .map(file => file.replace(/\.rb$/, ''))
}
