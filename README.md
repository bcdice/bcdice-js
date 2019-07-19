# BCDice

## Install
```bash
$ npm install --save bcdice
```

## Usage
```ts
import BCDice, { Info } from 'bcdice';
import 'bcdice/lib/diceBot/Cthulhu';

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
$ gem install opal
$ npm run install
```

### Build
```bash
$ npm run build
```

### Test
```bash
$ npm test
```
