import Base, { BaseInstance } from './Base';
import Opal from './Opal';

function mockRandomizer(base: BaseInstance): jest.Mock<number, [number]> {
  const $random = jest.fn<number, [number]>().mockReturnValue(1);
  Object.assign(base.randomizer, { $random });
  return $random;
}

describe('Base', () => {
  it('evaluates "2D6"', () => {
    const base = Base.$new('2d6');

    mockRandomizer(base)
      .mockReturnValueOnce(1)
      .mockReturnValueOnce(2);

      const result = base.$eval();

    expect(result.text).toBe('(2D6) ＞ 3[1,2] ＞ 3');
    expect(result.rands).toStrictEqual([[1, 6], [2, 6]]);
  });
});

describe('SwordWorld 2.5', () => {
  it('can be imported', async () => {
    await import('../lib/bcdice/game_system/SwordWorld2_5');
    expect(Opal.require('bcdice/game_system/SwordWorld2_5')).toBe(true);
  });

  it('evaluet "K20"', () => {
    const {GameSystem} = Opal.module(null, 'BCDice') as any;
    GameSystem.SwordWorld2_5.$new('K20').$eval();
  });
});
