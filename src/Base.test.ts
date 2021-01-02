import { expect } from 'chai';
import Base, { BaseInstance } from './Base';
import Opal from './Opal';
import { mockRandomizer } from './testutils';

describe('Base', () => {
  it('evaluates "2D6"', () => {
    const base = Base.$new('2d6');

    mockRandomizer(base)
      .onCall(0).returns(1)
      .onCall(1).returns(2);

      const result = base.$eval();

    expect(result.text).to.equal('(2D6) ＞ 3[1,2] ＞ 3');
    expect(result.rands).to.deep.equal([[1, 6], [2, 6]]);
  });
});

describe('SwordWorld 2.5', () => {
  it('can be imported', async () => {
    await import('../lib/bcdice/game_system/SwordWorld2_5');
  });

  it('evaluet "K20"', () => {
    const {GameSystem} = Opal.module(null, 'BCDice') as any;
    GameSystem.SwordWorld2_5.$new('K20').$eval();
  });
});
