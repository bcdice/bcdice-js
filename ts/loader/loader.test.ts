import { expect } from 'chai';
import Loader from './loader';

const loaders: [string, string, boolean][] = [
  ['./dynamic_loader', 'DynamicLoader', true],
  ['./static_loader', 'StaticLoader', false],
];

loaders.forEach(([path, title /*, dynamic */ ]) => {
  describe(title, () => {

    let loader: Loader;
    it('can be imported', async () => {
      loader = new (await import(path)).default();
    });

    it('loads game system class', async () => {
      const gameSystemClass = await loader.dynamicLoad('SwordWorld2.5');
      expect(gameSystemClass?.eval('K12')?.text).to.match(/^KeyNo\.12c\[10\] ＞ 2D:\[/);
    });

    it('enumerates game systems', async () => {
      const gameSystems = loader.listLoadedGameSystems();
      expect(Array.isArray(gameSystems)).to.be.true;
      expect(gameSystems.length).greaterThan(0);
      expect(gameSystems.every(a => Boolean(a))).to.be.true;
    });

    it('returns class of game system', () => {
      const gameSystemClass = loader.getGameSystemClass('SwordWorld2.5');
      expect(gameSystemClass?.eval('K20')?.text).to.match(/^KeyNo\.20c\[10\] ＞ 2D:\[/);
    });
  });
});
