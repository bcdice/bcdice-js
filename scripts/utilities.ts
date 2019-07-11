import * as childProcess from 'child_process';

export async function serial(tasks: (() => Promise<void>)[]): Promise<void> {
  return await tasks.reduce(async (p, c) => {
    await p;
    return await c();
  }, Promise.resolve());
}

export function exec(command: string, options: childProcess.ExecOptions = {}): Promise<string> {
  return new Promise((resolve, reject) => {
    childProcess.exec(command, options, (error, stdout, stderr) => {
      if (stderr) console.error(stderr);
      if (error) reject(error);
      else resolve(stdout);
    });
  });
}
