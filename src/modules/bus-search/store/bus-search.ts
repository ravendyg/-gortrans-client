import { BusSearchActions } from 'src/modules/bus-search/types';
import { IAction, IConfig } from 'src/types';
import { IBusSearchState, BusSearchStateParticle } from 'src/modules/bus-search/types';
import { getDefaultBusSearch } from 'src/modules/bus-search/defaults';
import { BusCodes } from 'src/types/enums';

export function createBusSearchReducer(config: IConfig) {
  return function busSearch(
    state: IBusSearchState = getDefaultBusSearch(),
    action: IAction<BusSearchActions, BusSearchStateParticle | IBusSearchState | BusCodes>
  ): IBusSearchState {

    switch (action.type) {

      case BusSearchActions.RESET_SEARCH_HISTORY: {
        return action.payload as IBusSearchState;
      }

      case BusSearchActions.ADD_TO_HISTORY: {
        const
          { key, busSearch } = action.payload as BusSearchStateParticle,
          newState: IBusSearchState = getDefaultBusSearch(),
          existing = state.lists[key] || []
          ;

        let updated = existing.filter(el => el !== busSearch);
        updated = [busSearch].concat(updated);
        updated = updated.slice(0, config.historyDisplayLimit);

        for (let _key of Object.keys(state)) {
          if (_key !== key) {
            newState.lists[_key] = state.lists[_key];
          }
        }

        newState.lists[key] = updated;

        return newState;
      }

      case BusSearchActions.CHANGE_TAB: {
        const newState: IBusSearchState = getDefaultBusSearch();
        newState.lists = state.lists;
        newState.activeTab = action.payload as BusCodes;
        return newState;
      }

      default: {
        return state;
      }
    }
  };
}
