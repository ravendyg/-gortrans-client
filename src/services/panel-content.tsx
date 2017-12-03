import * as React from 'react';
import Loadable from 'react-loadable';
import { RouterState } from 'src/types/data-types';
import { Settings } from 'src/components/settings/settings';
import { IStore } from 'src/types/state';

const SearchWrapper = Loadable({
  loader: () => import('../modules/bus-search'),
  loading() {
    return <div>Loading...</div>;
  }
});

// TODO: add memoisation

export function mapRouterStateToPanelState(store: IStore):  JSX.Element | null {

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
