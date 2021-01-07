import { UserDefinedDiceTable } from "..";

const table = new UserDefinedDiceTable(`テスト表
1D6
1:いち
2:に
3:さん
4:し
5:ご
6:ろく`);

console.log(table.roll()?.text);
