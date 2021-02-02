/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */

// const { UserDefinedDiceTable } = require('bcdice');
const { UserDefinedDiceTable } = require('../../lib');

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
