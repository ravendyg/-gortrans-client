import * as React from 'react';
import { IStoreProps } from '../../types';
import { Search } from './components/search';
import { config } from '../../config';
/** actions */
import { createBusListActions } from './actions/bus-list';
import { createBusSearchActions } from './actions/bus-search';
/** reducers */
import { createBusSearchReducer } from './store/bus-search';
import { createBusListReducer } from './store/bus-list';
/** services */
import { createBusListStorageService } from './services/bus-list-storage';
import { createBusSeachStorageService } from './services/bus-search-storage';
/** providers */
import { loadBusList } from './providers/bus-list';
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
      busList = createBusListReducer(),
      /** services */
      busListStorageService = createBusListStorageService(localStorage, config),
      busSearchService = createBusSeachStorageService(localStorage, config),
      /** providers */
      busSearchProvider = createBusSearchProvider(busSearchActions, busSearchService)
      ;

    store.injectAsyncReducer('busSearch', busSearch);
    store.injectAsyncReducer('busList', busList);

    loadBusList(busListActions, busListStorageService, store, config, Date);
    busSearchProvider.subscribe(store);

    return(
      <Search
        store={store}
        busListAction={busListActions}
      />
    );
  }
}
