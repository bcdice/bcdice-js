# BCDice

## Install
```bash
$ npm install --save bcdice
```

## Usage
```ts
import BCDice from '../bcdice-js/BCDice';
import 'bcdice/lib/diceBot/Cthulhu';

console.log(BCDice.games);

const bcdice = new BCDice();
const [result, rands] = bcdice.roll('CC', 'Cthulhu');
console.log(result, rands);

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
