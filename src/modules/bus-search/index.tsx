import * as React from 'react';
import { IStoreProps } from '../../types';
import { createBusListActions } from '../../actions/bus-list';
import { Search } from './components/search';
import { config } from '../../config';
import { createBusSearchReducer } from './store';

interface ISearchState {}

export interface ISearchProps extends IStoreProps {
}

export default class SearchWrapper extends React.PureComponent<ISearchProps, ISearchState> {

  render() {
    const
      store = this.props.store,
      busListActions = createBusListActions(store.dispatch),
      busSearch = createBusSearchReducer(config)
      ;

    store.injectAsyncReducer('busSearch', busSearch);

    return(
      <Search
        store={store}
        busListAction={busListActions}
      />
    );
  }
}
