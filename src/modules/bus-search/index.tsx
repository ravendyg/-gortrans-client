import * as React from 'react';
import { IStoreProps } from 'src/types';
import { IBusSearchModuleStore } from 'src/modules/bus-search/types';
import { Search } from 'src/modules/bus-search/components/search';
import { config } from 'src/config';
/** actions */
import { createBusListActions } from 'src/modules/bus-search/actions/bus-list';
import { createBusSearchActions } from 'src/modules/bus-search/actions/bus-search';
/** reducers */
import { createBusSearchReducer } from 'src/modules/bus-search/store/bus-search';
import { createBusListReducer } from 'src/modules/bus-search/store/bus-list';
/** services */
import { createBusListStorageService } from 'src/modules/bus-search/services/bus-list-storage';
import { createBusSeachStorageService } from 'src/modules/bus-search/services/bus-search-storage';
import { getBusIcon } from 'src/services/bus-icon-mapper';
/** providers */
import { loadBusList } from 'src/modules/bus-search/providers/bus-list';
import { createBusSearchProvider } from 'src/modules/bus-search/providers/bus-search';

require('./styles.scss');

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

    // dirty hack to get local store
    const localStore: IBusSearchModuleStore = store as any;

    loadBusList(busListActions, busListStorageService, store, config, Date);
    busSearchProvider.subscribe(store);

    return(
      <Search
        store={localStore}
        busListAction={busListActions}
        busSearchActions={busSearchActions}
        getBusIcon={getBusIcon}
      />
    );
  }
}
