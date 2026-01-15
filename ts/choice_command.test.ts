import { expect } from 'chai';
import DynamicLoader from './loader/dynamic_loader';
import { I18n } from './internal';
import { mockRandomizer } from './test/randomizer';

describe('Choice command', () => {
  it('keeps last item when multiple spaces between items', async () => {
    I18n.$clear_translate_table();
    const loader = new DynamicLoader();
    const GameSystemClass = await loader.dynamicLoad('DiceBot');
    const gameSystem = new GameSystemClass('choice 123  456  789');

    const $random = mockRandomizer(gameSystem);
    $random.onCall(0).returns(3);
    $random.onCall(1).throwsException(new Error('Unexpected call for $random'));

    const res = gameSystem.eval();
    expect(res?.text).to.equal('(choice 123 456 789) ＞ 789');
  });
});
