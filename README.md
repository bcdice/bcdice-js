# bcdice-js#next

**!!WIP!!**

## Installation
```bash
$ npm install --save bcdice-js
```

## Basic Usage
```ts
import { ESModuleLoader } from "bcdice-js";

async function main(): Promise<void> {
  const loader = new ESModuleLoader();

  const GameSystem = await loader.dynamicLoad('Cthulhu7th');
  const result = GameSystem.eval('CC<=54');

  console.log(result?.text);
}

main();
```

### UserDefinedDiceTable
```ts
import { UserDefinedDiceTable } from "bcdice-js";

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

## Development
* Node.js >= v14
* Ruby >= 2.7

```bash
$ git clone https://github.com/bcdice/bcdice-js.git
$ cd bcdice-js
$ git checkout next
$ git submodule update --init
$ bundle install
$ npm install
```

```bash
$ bundle exec rake
$ npm test
```
