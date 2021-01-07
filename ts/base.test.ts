import { expect } from 'chai';
import Base from './base';
import { mockRandomizer } from './test/randomizer';

describe('Base', () => {
  it('evaluates "2D6>=2"', () => {
    const base = new Base('2d6>=2');

    mockRandomizer(base)
      .onCall(0).returns(1)
      .onCall(1).returns(2);

    const result = base.eval();

    expect(result?.text).to.equal('(2D6>=2) ＞ 3[1,2] ＞ 3 ＞ 成功');
    expect(result?.rands).to.deep.equal([[1, 6], [2, 6]]);

    expect(result?.secret).to.be.false;
    expect(result?.success).to.be.true;
    expect(result?.failure).to.be.false;
    expect(result?.critical).to.be.false;
    expect(result?.fumble).to.be.false;

    expect(result?.detailedRands).to.deep.equal([
      { kind: 'normal', sides: 6, value: 1 },
      { kind: 'normal', sides: 6, value: 2 },
    ]);
  });

  it('evaluates static', () => {
    const result = Base.eval('2d6>=2');
    expect(result?.text).to.match(/^\(2D6>=2\) ＞ /);
  });
});
