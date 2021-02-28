import Loader from 'bcdice/lib/loader/loader';

export default class WebpackLoader extends Loader {
  async dynamicImport(className: string): Promise<void> {

    await import(
      /* webpackChunkName: '[request]' */
      /* webpackMode: 'lazy-once' */
      /* webpackInclude: /SwordWorld\.*\.js$/ */
      /* webpackExclude: /.*$/ */
      `../../../lib/bcdice/game_system/${className}`
    );
  }
}
