import * as React from 'react';
import { IStore, IReduxState } from '../../types/state';
import { Search } from './components/search';

export interface ISearchProps {
  store: IStore<IReduxState>;
}

export default function SearchWrapper({ store }: ISearchProps) {
  return <Search store={store}/>;
}
