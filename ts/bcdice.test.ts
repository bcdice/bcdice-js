import semver from 'semver';
import { expect } from "chai";
import BCDice from './bcdice';

describe('BCDice', () => {
  it('has valid VERSION', () => {
    // console.log(BCDice.VERSION);
    expect(semver.valid(BCDice.VERSION)).not.be.null;
  });
});
