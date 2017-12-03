import * as React from 'react';
import { IStoreProps } from 'src/types';
import { IBusSearchModuleStore } from 'src/modules/bus-search/types';
import { Search } from 'src/modules/bus-search/components/search';
import { config } from 'src/config';
import { IBusListAction, IBusSearchAction } from 'src/modules/bus-search/types';
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

  private busListActions: IBusListAction;
  private busSearchActions: IBusSearchAction;

  private _unsubscribe = () => {/**/};

  componentWillMount() {
    const
      { store } = this.props,
      /** reducers */
      busSearch = createBusSearchReducer(config),
      busList = createBusListReducer(),
      /** services */
      busListStorageService = createBusListStorageService(localStorage, config),
      busSearchService = createBusSeachStorageService(localStorage, config)
      ;

    this.busListActions = createBusListActions(store.dispatch);
    this.busSearchActions = createBusSearchActions(store.dispatch);
    const busSearchProvider = createBusSearchProvider(this.busSearchActions, busSearchService);

    store.injectAsyncReducer('busSearch', busSearch);
    store.injectAsyncReducer('busList', busList);

    // TODO: move bus list back to main, to make it load before any search
    loadBusList(this.busListActions, busListStorageService, store, config, Date);

    const promisedUnsubscribe = busSearchProvider.subscribe(store);
    if (promisedUnsubscribe) {
      promisedUnsubscribe.then((unsub) => {
        this._unsubscribe = unsub;
      });
    }
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  render() {
    // dirty hack to get local store
    const
      { store } = this.props,
      { busListActions, busSearchActions } = this,
      localStore: IBusSearchModuleStore = store as any
      ;

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
