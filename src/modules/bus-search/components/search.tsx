import * as React from 'react';

import { SearchInput } from './input';
import { IStore, IReduxState } from '../../../types/state';

interface ISearchState {}

interface ISearchProps {
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
          emit={() => { console.log('emit'); }}
          store={this.props.store}
        />
      </div>
    );
  }
}


// emit={this.props.actions.busListActions.updateQuery}
