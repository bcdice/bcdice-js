import * as fs from 'fs';
import * as path from 'path';
import { spawn, SpawnOptions } from 'child_process';
import { srcDir, libDir, getDiceBotSources, jsSrcDir } from './utilities';

async function opal(src: string, noOpal: boolean): Promise<void> {
  const dst = src.replace(/\.rb$/, '.js').replace(srcDir, libDir).replace(jsSrcDir, libDir);

  const command = process.platform === 'win32' ? 'bundle.bat' : 'bundle';
  const args = [
    'exec',
    'opal',
    '-c',
    ...noOpal ? ['-O'] : [],
    '-s',
    'kconv',
    '-I',
    srcDir,
    src,
  ];
  const options: SpawnOptions = {
    stdio: 'pipe',
  };
  const fileStream = fs.createWriteStream(dst);

  console.log(command, ...args, src, '>', dst);
  const child = spawn(command, args, options);

  if (!child.stdout || !child.stderr) throw new Error();
  child.stdout.pipe(fileStream);
  child.stderr.pipe(process.stderr);

  return await new Promise((resolve, reject) => {
    child.on('error', reject);
    child.on('exit', (code) => {
      if (code) reject(code)
      else resolve();
    });
  });
}

async function build(): Promise<void> {
  await fs.promises.mkdir(path.join(libDir, 'diceBot'), { recursive: true });
  const diceBotSources = await getDiceBotSources();
  await [
    ...diceBotSources.map((src) => () => opal(src, true)),
    () => opal(path.join(srcDir, 'cgiDiceBot.rb'), true),
    () => opal(path.join(jsSrcDir, 'DiceBotLoader.rb'), true),
    () => opal(path.join(jsSrcDir, 'JsPatch.rb'), false),
  ].reduce(async (prev, curr) => {
    await prev;
    await curr();
  }, Promise.resolve());
}
build().catch((e) => console.error(e));
