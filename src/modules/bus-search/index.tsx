import * as React from 'react';
import { IStoreProps } from '../../types';
import { Search } from './components/search';
import { config } from '../../config';
/** actions */
import { createBusListActions } from './actions/bus-list';
import { createBusSearchActions } from './actions/bus-search';
/** reducers */
import { createBusSearchReducer } from './store/bus-search';
/** services */
import { createBusListStorageService } from './services/bus-list-storage';
import { createBusSeachStorageService } from './services/bus-search-storage';
/** providers */
import { createBusListProvider } from './providers/bus-list';
import { createBusSearchProvider } from './providers/bus-search';

interface ISearchState {}

export interface ISearchProps extends IStoreProps {
}

export default class SearchWrapper extends React.PureComponent<ISearchProps, ISearchState> {

  render() {
    const
      store = this.props.store,
      /** actions */
      busListActions = createBusListActions(store.dispatch),
      busSearchActions = createBusSearchActions(store.dispatch),
      /** reducers */
      busSearch = createBusSearchReducer(config),
      /** services */
      busListStorageService = createBusListStorageService(localStorage, config),
      busSearchService = createBusSeachStorageService(localStorage, config),
      /** providers */
      busListProvider = createBusListProvider(busListActions, busListStorageService, config, Date),
      busSearchProvider = createBusSearchProvider(busSearchActions, busSearchService)
      ;

    store.injectAsyncReducer('busSearch', busSearch);
    busListProvider.subscribe(store);
    busSearchProvider.subscribe(store);

    return(
      <Search
        store={store}
        busListAction={busListActions}
      />
    );
  }
}
