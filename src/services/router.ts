import { IStore } from '../types/state';
import { IControlAction } from '../types/action-types';
import { RouterState } from '../types/data-types';

/**
 * routing
 * don't need a full blown router, can survive with a small hack
 */
export function createRouter(win: Window, Store: IStore, controlActions: IControlAction) {

  const
    searchRegExp = new RegExp(RouterState.SEARCH + '$'),
    settingsRegExp = new RegExp(RouterState.SETTINGS + '$')
    ;

  function onHashChange(ev: HashChangeEvent) {
    const url = ev.newURL || '';

    if (searchRegExp.test(url)) {
      controlActions.goTo(RouterState.SEARCH);
    } else if (settingsRegExp.test(url)) {
      controlActions.goTo(RouterState.SETTINGS);
    } else {
      controlActions.goToRoot();
    }
  }

  function onStoreChange() {
    const
      routerState = Store.getState().appState,
      hash = win.location.hash
      ;
    if (routerState === RouterState.SEARCH && hash !== RouterState.SEARCH) {
      win.location.hash = RouterState.SEARCH;
    } else if (routerState === RouterState.SETTINGS && hash !== RouterState.SETTINGS) {
      win.location.hash = RouterState.SETTINGS;
    } else if (routerState === RouterState.BLANK && hash !== RouterState.BLANK && hash !== RouterState.EMPTY) {
      win.location.hash = RouterState.BLANK;
    }
  }

  function initRouting() {
    // always start at blank start with a search displayed
    if (win.location.hash) {
      win.location.hash = RouterState.BLANK;
    }

    win.addEventListener('hashchange', onHashChange);
    Store.subscribe(onStoreChange);
  }

  return initRouting;
}
