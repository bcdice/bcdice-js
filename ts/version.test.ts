import semver from 'semver';
import { expect } from "chai";
import Version from './version';

describe('Version', () => {
  it('is valid VERSION', () => {
    // console.log(BCDice.VERSION);
    expect(semver.valid(Version)).not.be.null;
  });
});
