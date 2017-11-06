import * as React from 'react';

import { SearchInput } from 'src/modules/bus-search/components/input';
import { TypeSelector } from 'src/modules/bus-search/components/type-selector';
import { IBusListAction, IBusSearchAction, IBusSearchModuleStore, IBusSearchModuleStateParticle } from 'src/modules/bus-search/types';
import { BusCodes } from 'src/types/enums';
import { Connected } from 'src/components/connected';
import { Way } from 'src/types/data-types';
import { filterBusList } from 'src/modules/bus-search/services/filter-bus-list';
import { mapBusCodeToIndex } from 'src/services/map-bus-code-to-index';

interface ISearchState {
  ways: Way [];
}

export interface ISearchProps {
  store: IBusSearchModuleStore;
  busListAction: IBusListAction;
  busSearchActions: IBusSearchAction;
  getBusIcon: (busCode: BusCodes) => string;
}

const style: { [name: string]: string } = {
  heigth: '100%',
  width: '100%'
};

export const selector = 'bus-search';

export class Search extends Connected<ISearchProps, ISearchState, IBusSearchModuleStateParticle> {

  mapState(newState: IBusSearchModuleStateParticle): ISearchState {
    const ways = newState.busList.query ?
      filterBusList(
        newState.busList.list[mapBusCodeToIndex(newState.busSearch.activeTab)].ways,
        newState.busList.query
      ) :
      newState.busSearch.lists[newState.busSearch.activeTab]
    ;

    return { ways };
  }

  render() {
    const {store, getBusIcon, busListAction: {updateQuery}, busSearchActions: {updateType}} = this.props;

    return(
      <div className="search__wrapper" style={style} data-test-id={selector}>
        <TypeSelector
          store={store}
          getBusIcon={getBusIcon}
          updateType={updateType}
        />
        <SearchInput
          emit={updateQuery}
          store={store}
        />
      </div>
    );
  }
}
