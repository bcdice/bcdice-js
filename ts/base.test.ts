import { expect } from 'chai';
import Base from './base';
import { mockRandomizer } from './test_utils';

describe('Base', () => {
  it('evaluates "2D6>=2"', () => {
    const base = Base.$new('2d6>=2');

    mockRandomizer(base)
      .onCall(0).returns(1)
      .onCall(1).returns(2);

    const result = base.$eval();

    expect(result.text).to.equal('(2D6>=2) ＞ 3[1,2] ＞ 3 ＞ 成功');
    expect(result.rands).to.deep.equal([[1, 6], [2, 6]]);

    expect(result.secret).to.be.false;
    expect(result.success).to.be.true;
    expect(result.failure).to.be.false;
    expect(result.critical).to.be.false;
    expect(result.fumble).to.be.false;

    expect(result.detailed_rands[0].$kind()).to.equal('normal');
    expect(result.detailed_rands[0].$sides()).to.equal(6);
    expect(result.detailed_rands[0].$value()).to.equal(1);

    expect(result.detailed_rands[1].$kind()).to.equal('normal');
    expect(result.detailed_rands[1].$sides()).to.equal(6);
    expect(result.detailed_rands[1].$value()).to.equal(2);
  });
});
