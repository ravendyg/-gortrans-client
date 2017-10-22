import * as React from 'react';
import { RouterState } from '../types/data-types';
import { Settings } from '../components/settings/settings';
import { IStore, IReduxState } from '../types/state';
import Loadable from 'react-loadable';

const SearchWrapper = Loadable({
  loader: () => import('../modules/bus-search'),
  loading() {
    return <div>Loading...</div>;
  }
});

// TODO: add memoisation

export function mapRouterStateToPanelState(store: IStore<IReduxState>):  JSX.Element | null {

  const routerState = store.getState().appState;

  switch (routerState) {
    case RouterState.SEARCH: {
      if (!store) {
        throw('store not defined');
      }
      return <SearchWrapper store={store} />;
    }

    case RouterState.SETTINGS: {
      return <Settings />;
    }

    default: {
      return null;
    }
  }
}
