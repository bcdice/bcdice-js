# bcdice-js#next

**!!WIP!!**

## Installation
```bash
$ npm install --save bcdice-js
```

## Usage
```ts
import { DynamicLoader } from "bcdice-js";

async function main(): Promise<void> {
  const loader = new DynamicLoader();

  console.log(loader.listAvailableGameSystems().map(info => info.id));

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

### Loaders
* `StaticLoader`: `import StaticLoader from 'bcdice/lib/loaders/static_loader';`
* `DynamicLoader`: `import { DynamicLoader } from 'bcdice';`

or extend `Loader` (`improt Loader from 'bcdice/lib/loaders/loader'`) and make your custom loader.

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
