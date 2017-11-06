import * as React from 'react';

import { SearchInput } from 'src/modules/bus-search/components/input';
import { TypeSelector } from 'src/modules/bus-search/components/type-selector';
import { IBusListAction, IBusSearchAction, IBusSearchModuleStore } from 'src/modules/bus-search/types';
import { BusCodes } from 'src/types/enums';

interface ISearchState {}

interface ISearchProps {
  store: IBusSearchModuleStore;
  busListAction: IBusListAction;
  busSearchActions: IBusSearchAction;
  getBusIcon: (busCode: BusCodes) => string;
}

const style: { [name: string]: string } = {
  heigth: '100%',
  width: '100%'
};

export class Search extends React.Component<ISearchProps, ISearchState> {
  render() {
    const {store, getBusIcon, busListAction: {updateQuery}, busSearchActions: {changeTab}} = this.props;

    return(
      <div className="search__wrapper" style={style} data-test-id="bus-search">
        <TypeSelector
          store={store}
          getBusIcon={getBusIcon}
          updateType={changeTab}
        />
        <SearchInput
          emit={updateQuery}
          store={store}
        />
      </div>
    );
  }
}
