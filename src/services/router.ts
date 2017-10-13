import { IStore, IReduxState } from '../types/state';
import { IControlAction } from '../types/action-types';

export const searchHash = '#search';

/**
 * routing
 * don't need a full blown router, can survive with a small hack
 */
export function createRouter(win: Window, Store: IStore<IReduxState>, controlActions: IControlAction) {

  function initRouting() {
    // don't start with a search displayed
    if (win.location.hash) {
      win.location.hash = '';
    }
    const
      searchHasRegExp = new RegExp(searchHash + '$')
      ;
    win.addEventListener('hashchange', (ev: HashChangeEvent) => {
      if (searchHasRegExp.test(ev.newURL || '')) {
        controlActions.showSearch();
      } else {
        controlActions.hideSearch();
      }
    });
    Store.subscribe(() => {
      const
        showSearch = Store.getState().appState.showSearch,
        showSearchInHash = searchHasRegExp.test(win.location.hash)
        ;
      if (showSearch && !showSearchInHash) {
        win.location.hash = searchHash;
      } else if (!showSearch && showSearchInHash) {
        win.location.hash = '';
      }
    });
  }

  return initRouting;
}
