import { expect } from "chai";
import { mockedRandomizer } from "./test/randomizer";
import UserDefinedDiceTable from "./user_defined_dice_table";

describe('UserDefinedDiceTable', () => {
  const text_1d6 = `テスト表
1D6
1:いち
2:に
3:さん
4:し
5:ご
6:ろく`;

  const text_3d4 = `3-4テスト表
3D4
3:さん
4:し
5:ご
6:ろく
7:なな
8:はち
9:きゅう
10:じゅう
11:じゅういち
12:じゅうに`;

  const text_d66 = `ソートなし表
D66
11:a
12:a
13:a
14:a
15:a
16:いちろく
21:a
22:a
23:a
24:a
25:a
26:a
31:a
32:a
33:a
34:a
35:a
36:a
41:a
42:a
43:a
44:a
45:a
46:a
51:a
52:a
53:a
54:a
55:a
56:a
61:ろくいち
62:a
63:a
64:a
65:a
66:a`;

  const text_d66a = `ソート昇順表
D66a
11:a
12:a
13:a
14:a
15:a
16:いちろく
22:a
23:a
24:a
25:a
26:a
33:a
34:a
35:a
36:a
44:a
45:a
46:a
55:a
56:a
66:a`;

  const text_d66d = `ソート降順表
D66d
11:a
21:a
22:a
31:a
32:a
33:a
41:a
42:a
43:a
44:a
51:a
52:a
53:a
54:a
55:a
61:ろくいち
62:a
63:a
64:a
65:a
66:a`;
  it('id6_1', () => {
    const table = new UserDefinedDiceTable(text_1d6);
    const result = table.roll(mockedRandomizer([[1, 6]])[0]);
    expect(result?.text).to.equal('テスト表(1) ＞ いち');
  });

  it('1d6_6', () => {
    const table = new UserDefinedDiceTable(text_1d6)
    const result = table.roll(mockedRandomizer([[6, 6]])[0]);

    expect(result?.text).to.equal("テスト表(6) ＞ ろく");
  });

  it('3d4_3', () => {
    const table = new UserDefinedDiceTable(text_3d4);
    const result = table.roll(mockedRandomizer([[1, 4], [1, 4], [1, 4]])[0]);

    expect(result?.text).to.equal("3-4テスト表(3) ＞ さん");
  });

  it('3d4_12', () => {
    const table = new UserDefinedDiceTable(text_3d4);
    const result = table.roll(mockedRandomizer([[4, 4], [4, 4], [4, 4]])[0]);

    expect(result?.text).to.equal("3-4テスト表(12) ＞ じゅうに");
  });

  it('d66_16', () => {
    const table = new UserDefinedDiceTable(text_d66);
    const result = table.roll(mockedRandomizer([[1, 6], [6, 6]])[0]);

    expect(result?.text).to.equal("ソートなし表(16) ＞ いちろく");
  });

  it('d66_61', () => {
    const table = new UserDefinedDiceTable(text_d66);
    const result = table.roll(mockedRandomizer([[6, 6], [1, 6]])[0]);

    expect(result?.text).to.equal("ソートなし表(61) ＞ ろくいち");
  });

  it('d66a_16', () => {
    const table = new UserDefinedDiceTable(text_d66a);
    const result = table.roll(mockedRandomizer([[1, 6], [6, 6]])[0]);

    expect(result?.text).to.equal("ソート昇順表(16) ＞ いちろく");
  });

  it('d66a_61', () => {
    const table = new UserDefinedDiceTable(text_d66a)
    const result = table.roll(mockedRandomizer([[6, 6], [1, 6]])[0]);

    expect(result?.text).to.equal("ソート昇順表(16) ＞ いちろく");
  });

  it('d66d_16', () => {
    const table = new UserDefinedDiceTable(text_d66d)
    const result = table.roll(mockedRandomizer([[1, 6], [6, 6]])[0]);

    expect(result?.text).to.equal("ソート降順表(61) ＞ ろくいち");
  });

  it('d66d_61', () => {
    const table = new UserDefinedDiceTable(text_d66d)
    const result = table.roll(mockedRandomizer([[6, 6], [1, 6]])[0]);

    expect(result?.text).to.equal("ソート降順表(61) ＞ ろくいち");
  });

  it('invalid_dice_type', () => {
    const text = `不正な表
D100
100:ひゃく`;

    const table = new UserDefinedDiceTable(text);
    expect(table.roll()).to.be.null;
  });

  it('verify_1d6', () => {
    const table = new UserDefinedDiceTable(text_1d6)

    expect(table.validate()).to.be.true;
  });

  it('verify_d66', () => {
    const table = new UserDefinedDiceTable(text_d66)
    expect(table.validate()).to.be.true;
  });

  it('verify_d66a', () => {
    const table = new UserDefinedDiceTable(text_d66a)
    expect(table.validate()).to.be.true;
  });

  it('verify_d66d', () => {
    const table = new UserDefinedDiceTable(text_d66d)
    expect(table.validate()).to.be.true;
  });

  it('verify_3d4_miss_rows', () => {
    const text = `抜けありテスト表
3D4
3:さん
4:し
5:ご
6:ろく
12:じゅうに`;

    const table = new UserDefinedDiceTable(text)
    expect(table.validate()).to.be.false;
  });

  it('verify_invalid_dice_type', () => {
    const text = `不正な表
D100
100:ひゃく`;

    const table = new UserDefinedDiceTable(text)
    expect(table.validate()).to.be.false;
  });

  it('verify_dup_rows', () => {
    const text = `重複あり表
2D4
2:a
2:b
4:c
5:d
6:e
7:f
8:g`;

    const table = new UserDefinedDiceTable(text)
    expect(table.validate()).to.be.false;
  });

  it('verify_outrange_row', () => {
    const text = `範囲外表
    1D4
    1:a
    2:b
    3:c
    5:d`;

    const table = new UserDefinedDiceTable(text)
    expect(table.validate()).to.be.false;
  });

  it('invalid_d66', () => {
    // 表の中身がD66aの物になっている
    const text = `フォーマット確認(D66)
D66
11:a
12:a
13:a
14:a
15:a
16:a
22:a
23:a
24:a
25:a
26:a
33:a
34:a
35:a
36:a
44:a
45:a
46:a
55:a
56:a
66:a`;

    const table = new UserDefinedDiceTable(text)
    expect(table.validate()).to.be.false;
  });

  it('invalid_d66a', () => {
    // 表の中身がD66dの物になっている
    const text = `フォーマット確認(D66d)
D66a
11:a
21:a
22:a
31:a
32:a
33:a
41:a
42:a
43:a
44:a
51:a
52:a
53:a
54:a
55:a
61:a
62:a
63:a
64:a
65:a
66:a`;


    const table = new UserDefinedDiceTable(text)
    expect(table.validate()).to.be.false;
  });

  it('invalid_d66d', () => {
    // 表の中身がD66aの物になっている
    const text = `フォーマット確認(D66d)
D66d
11:a
12:a
13:a
14:a
15:a
16:a
22:a
23:a
24:a
25:a
26:a
33:a
34:a
35:a
36:a
44:a
45:a
46:a
55:a
56:a
66:a`;

    const table = new UserDefinedDiceTable(text)
    expect(table.validate()).to.be.false;
});
});
