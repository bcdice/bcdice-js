# bcdice-js
[![npm](https://img.shields.io/npm/v/bcdice.svg)](https://www.npmjs.com/package/bcdice)
[![CI](https://github.com/bcdice/bcdice-js/workflows/CI/badge.svg)](https://github.com/bcdice/bcdice-js/actions)
[![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/bcdice.svg)](#)
[![GitHub issues](https://img.shields.io/github/issues/bcdice/bcdice-js.svg)](https://github.com/bcdice/bcdice-js/issues)
[![GitHub forks](https://img.shields.io/github/forks/bcdice/bcdice-js.svg)](https://github.com/bcdice/bcdice-js/network)
[![GitHub stars](https://img.shields.io/github/stars/bcdice/bcdice-js.svg)](https://github.com/bcdice/bcdice-js/stargazers)
[![GitHub license](https://img.shields.io/github/license/bcdice/bcdice-js.svg)](https://github.com/bcdice/bcdice-js/blob/master/LICENSE)
[![Discord](https://img.shields.io/discord/597133335243784192.svg?color=7289DA&logo=discord&logoColor=fff)](https://discord.gg/x5MMKWA)

BCDice ported package for TypeScript/JavaScript by Opal.

## Installation
```bash
$ npm install --save bcdice
```

## Usage
JavaScript (CommonJS)
```js
const { DynamicLoader, Version } = require('bcdice');

async function main() {
  console.log('BCDice Version:', Version);

  const loader = new DynamicLoader();

  console.log(loader.listAvailableGameSystems().map(info => info.id));

  const GameSystem = await loader.dynamicLoad('Cthulhu7th');

  console.log(GameSystem.NAME);
  console.log(GameSystem.HELP_MESSAGE);

  const result = GameSystem.eval('CC<=54');

  console.log(result && result.text);
}

main();
```

TypeScript
```ts
import { DynamicLoader, Version } from 'bcdice';

async function main(): Promise<void> {
  console.log('BCDice Version:', Version);

  const loader = new DynamicLoader();

  console.log(loader.listAvailableGameSystems().map(info => info.id));

  const GameSystem = await loader.dynamicLoad('Cthulhu7th');

  console.log(GameSystem.NAME);
  console.log(GameSystem.HELP_MESSAGE);

  const result = GameSystem.eval('CC<=54');

  console.log(result?.text);
}

main();
```

### UserDefinedDiceTable
JavaScript (CommonJS)
```js
const { UserDefinedDiceTable } = require('bcdice');

const table = new UserDefinedDiceTable(`テスト表
1D6
1:いち
2:に
3:さん
4:し
5:ご
6:ろく`);

const result = table.roll();
console.log(result && result.text);
```

TypeScript
```ts
import { UserDefinedDiceTable } from 'bcdice';

const table = new UserDefinedDiceTable(`テスト表
1D6
1:いち
2:に
3:さん
4:し
5:ご
6:ろく`);

console.log(table.roll()?.text);
```

### Loaders
* `StaticLoader`: `import StaticLoader from 'bcdice/lib/loader/static_loader';`
  * Load all GameSystems on startup.
* `DynamicLoader`: `import { DynamicLoader } from 'bcdice';`

or extend `Loader` (`import Loader from 'bcdice/lib/loader/loader'`) and make your custom loader.

## Internal BCDice Versions
Since v2.x, you can get the version of internal BCDice by importing `Version` from '`bcdice`'.

| bcdice-js | BCDice |
|---|---|
| 3.0.0 | Ver3.00.00 |
| 2.0.0 | Ver3.00.00 |
| 1.x.x | Ver2.xx.xx |

## Development
* Node.js >= v14
* Ruby >= 2.7

```bash
$ git clone https://github.com/bcdice/bcdice-js.git
$ cd bcdice-js
$ git submodule update --init
$ bundle install
$ npm install
```

```bash
$ npm run build
$ npm test
```

## Migration from 2.x to 3.x
`Loader.dynamicImport(className: string)` now accepts a `className` instead of a `path`. Custom loaders need to search for `GameSystem` from known path. See also [`DynamicLoader`](ts/loader/dynamic_loader.ts).
