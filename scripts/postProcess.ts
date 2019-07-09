import { promises as fs } from 'fs';
import * as path from 'path';
import { libDir } from './utilities';

async function postProcess(): Promise<void> {
  const filePath = path.join(libDir, 'BCDice.js');
  console.log('Processing', filePath);
  const source = await fs.readFile(filePath);
  const content = source.toString().replace(
    /require\("@lib\/.*"\);/g,
    match => match.replace(/@lib\//, './'),
  );
  await fs.writeFile(filePath, content);
}
postProcess().catch(e => console.error(e));
