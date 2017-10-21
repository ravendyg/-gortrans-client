import * as React from 'react';
import { RouterState } from '../types/data-types';
import { Settings } from '../components/settings/settings';
import { Search } from '../modules/bus-search/components/search';
import { IStore, IReduxState } from '../types/state';

export declare type PanelContent = JSX.Element | null;

export function mapRouterStateToPanelState(
  routerState: RouterState, store?: IStore<IReduxState>
): PanelContent {
  switch (routerState) {
    case RouterState.SEARCH: {
      if (!store) {
        throw('store not defined');
      }
      return <Search
        store={store}
      />;
    }

    case RouterState.SETTINGS: {
      return <Settings />;
    }

    default: {
      return null;
    }
  }
}
