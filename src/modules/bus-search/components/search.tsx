import * as React from 'react';

import { SearchInput } from 'src/modules/bus-search/components/input';
import { TypeSelector } from 'src/modules/bus-search/components/type-selector';
import { IBusListAction, IBusSearchModuleStore } from 'src/modules/bus-search/types';

interface ISearchState {}

interface ISearchProps {
  store: IBusSearchModuleStore;
  busListAction: IBusListAction;
}

const style: { [name: string]: string } = {
  heigth: '100%',
  width: '100%'
};

export class Search extends React.Component<ISearchProps, ISearchState> {
  render() {
    return(
      <div className="search__wrapper" style={style} data-test-id="bus-search">
        <SearchInput
          emit={this.props.busListAction.updateQuery}
          store={this.props.store}
        />
        <TypeSelector
          store={this.props.store}
        />
      </div>
    );
  }
}
