# BCDice
[![npm](https://img.shields.io/npm/v/bcdice.svg)](https://www.npmjs.com/package/bcdice)
[![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/bcdice.svg)](#)
[![Travis (.org)](https://img.shields.io/travis/bcdice/bcdice-js.svg)](https://travis-ci.org/github/bcdice/bcdice-js)
[![GitHub issues](https://img.shields.io/github/issues/bcdice/bcdice-js.svg)](https://github.com/bcdice/bcdice-js/issues)
[![GitHub forks](https://img.shields.io/github/forks/bcdice/bcdice-js.svg)](https://github.com/bcdice/bcdice-js/network)
[![GitHub stars](https://img.shields.io/github/stars/bcdice/bcdice-js.svg)](https://github.com/bcdice/bcdice-js/stargazers)
[![GitHub license](https://img.shields.io/github/license/bcdice/bcdice-js.svg)](https://github.com/bcdice/bcdice-js/blob/master/LICENSE)

BCDice ported package for JavaScript by Opal.

## Install
```bash
$ npm install --save bcdice
```

## Usage
```ts
import BCDice, { Info } from 'bcdice';
import 'bcdice/lib/diceBot/Cthulhu';

/* or CommonJS
const BCDice = require('bcdice').default; // Do not forget ".default"

require('bcdice/lib/diceBot/Cthulhu');
*/

function getInfo(gameType: string): Info | undefined {
  return BCDice.infoList.find(info => info.gameType === gameType);
}

interface RollResult {
  result: string;
  rands: number[][] | null;
}

function roll(command: string, gameType: string): RollResult {
  const bcdice = new BCDice();
  const [result, rands] = bcdice.roll(command, gameType);
  return {
    result,
    rands,
  };
}

console.log(getInfo('Cthulhu'))
console.log(roll('CC', 'Cthulhu'));
```

### Dynamic Importing
```ts
import BCDice, { Info } from 'bcdice';

function getInfo(gameType: string): Info | undefined {
  return BCDice.infoList.find(info => info.gameType === gameType);
}

interface RollResult {
  result: string;
  rands: number[][] | null;
}

function roll(command: string, gameType: string): Promise<RollResult? {
  const bcdice = new BCDice();
  return import(`bcdice/lib/diceBot/${gameType}`).then(() => {
    const [result, rands] = bcdice.roll(command, gameType);
    return {
      result,
      rands,
    };
  });
}

console.log(getInfo('Cthulhu'));
roll('CC', 'Cthulhu').then(result => console.log(result));
```

## Development
### Install
```bash
$ bundle install
$ npm install
```

### Build
```bash
$ npm run build
```

### Test
```bash
$ npm test
```
