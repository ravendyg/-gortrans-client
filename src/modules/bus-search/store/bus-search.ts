import { BusSearchActions } from 'src/modules/bus-search/types';
import { IConfig } from 'src/types';
import { IBusSearchState } from 'src/modules/bus-search/types';
import { getDefaultBusSearch } from 'src/modules/bus-search/defaults';
import { BusCodes } from 'src/types/enums';
import { assertNever } from 'src/services/assertNever';
import { BusSearchActionTypes } from 'src/modules/bus-search/actions/bus-search';

export function createBusSearchReducer(config: IConfig) {
  return function busSearch(
    state: IBusSearchState = getDefaultBusSearch(),
    action: BusSearchActionTypes,
  ): IBusSearchState {

    let newState = state;

    switch (action.type) {

      case BusSearchActions.RESET_SEARCH_HISTORY: {
        newState = action.payload;
        break;
      }

      case BusSearchActions.ADD_TO_HISTORY: {
        const
          { key, way } = action.payload,
          existing = state.lists[key] || []
          ;
        let updated = existing.filter(el => el !== way);

        newState = getDefaultBusSearch();
        updated = [way].concat(updated);
        updated = updated.slice(0, config.historyDisplayLimit);

        for (let _key of Object.keys(state)) {
          if (_key !== key) {
            newState.lists[_key] = state.lists[_key];
          }
        }

        newState.lists[key] = updated;
        break;
      }

      case BusSearchActions.CHANGE_TAB: {
        newState = getDefaultBusSearch();
        newState.lists = state.lists;
        newState.activeTab = action.payload as BusCodes;
        break;
      }

      default: {
        assertNever(action);
      }
    }

    return newState;
  };
}
