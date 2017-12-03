import * as React from 'react';

import { SearchInput } from 'src/modules/bus-search/components/search-input';
import { TypeSelector } from 'src/modules/bus-search/components/type-selector';
import { IBusListAction, IBusSearchAction, IBusSearchModuleStore, IBusSearchModuleStateParticle } from 'src/modules/bus-search/types';
import { BusCodes } from 'src/types/enums';
import { Connected } from 'src/components/connected';
import { Way } from 'src/types/data-types';
import { filterBusList } from 'src/modules/bus-search/services/filter-bus-list';
import { mapBusCodeToIndex } from 'src/services/map-bus-code-to-index';
import { SearchItem } from 'src/modules/bus-search/components/search-item';

interface ISearchState {
  type: BusCodes;
  ways: Way [];
}

export interface ISearchProps {
  store: IBusSearchModuleStore;
  busListAction: IBusListAction;
  busSearchActions: IBusSearchAction;
  getBusIcon: (busCode: BusCodes) => string;
}

export const selector = 'bus-search';

export class Search extends Connected<ISearchProps, ISearchState, IBusSearchModuleStateParticle> {

  mapState(newState: IBusSearchModuleStateParticle): ISearchState {
    const { busList, busSearch } = newState;

    const
      list = busList.list[mapBusCodeToIndex(newState.busSearch.activeTab)],
      ways = busList.query
        ? filterBusList(list.ways, busList.query)
        : busSearch.lists[busSearch.activeTab]
      ,
      updatedState = {
        type: busSearch.activeTab,
        ways,
      }
      ;

    return updatedState;
  }

  emit = (type: BusCodes, marsh: string) => {
    console.log(type + '-' + marsh);
  }

  render() {
    const
      { store,
        getBusIcon,
        busListAction: { updateQuery },
        busSearchActions: { updateType }
      } = this.props,
      { type, ways } = this.state,
      DisplayedWays = ways.map(way => (
        <SearchItem
          key={type + '-' + way.marsh}
          type={type}
          way={way}
          emit={this.emit}
        />
      ))
      ;

    return(
      <div className="search__wrapper" data-test-id={selector}>
        <TypeSelector
          store={store}
          getBusIcon={getBusIcon}
          updateType={updateType}
        />
        <SearchInput
          emit={updateQuery}
          store={store}
        />
        <div className={'search__items'}>
          { DisplayedWays }
        </div>
      </div>
    );
  }
}
