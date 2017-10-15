import * as React from 'react';

import { IPropsWithAction } from '../../types/action-types';
import { SearchInput } from './input';
import { IStore, IReduxState } from '../../types/state';

interface ISearchState {}

interface ISearchProps extends IPropsWithAction {
  store: IStore<IReduxState>;
}

const style: { [name: string]: string } = {
  heigth: '100%',
  width: '100%'
};

export class Search extends React.Component<ISearchProps, ISearchState> {
  render() {
    return(
      <div className="search__wrapper" style={style}>
        <SearchInput
          emit={this.props.actions.busListActions.updateQuery}
          store={this.props.store}
        />
      </div>
    );
  }
}
