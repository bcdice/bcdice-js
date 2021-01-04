import { expect } from "chai";
import BCDice from "../bcdice";
import Loader from "./loader";

const loaders: [string, string, boolean][] = [
  ['./commonjs_loader', 'CommonJSLoader', true],
  ['./esmodule_loader', 'ESModuleLoader', true],
  ['./static_loader', 'StaticLoader', false],
];

loaders.forEach(([path, title, dynamic]) => {
  describe(title, () => {

    let loader: Loader;
    it('can be imported', async () => {
      // if (BCDice.GameSystem) {
      //   BCDice.$remove_const('GameSystem');
      // }

      loader = new (await import(path)).default();
    });

    // if (dynamic) {
    //   it('loads dynamically', () => {
    //     expect(() => loader.game_system_class('SwordWorld2.5')).to.throw();
    //   });
    // } else {
    //   it('loads statically', () => {
    //     expect(() => loader.game_system_class('SwordWorld2.5')).not.to.throw();
    //   });
    // }

    it('loads game system class', async () => {

      const gameSystem = await loader.dynamic_load('SwordWorld2_5');
      expect(gameSystem?.$eval('K12')?.text).to.match(/^KeyNo\.12c\[10\] ＞ 2D:\[/);
    });

    it('enumerates game systems', async () => {
      const gameSystems = loader.all_game_systems();
      expect(Array.isArray(gameSystems)).to.be.true;
      expect(gameSystems.length).greaterThan(0);
      expect(gameSystems.every(a => Boolean(a))).to.be.true;
    });

    it('returns class of game system', () => {
      const gameSystem = loader.game_system_class('SwordWorld2.5');
      expect(gameSystem?.$eval('K20')?.text).to.match(/^KeyNo\.20c\[10\] ＞ 2D:\[/);
    });
  });
});