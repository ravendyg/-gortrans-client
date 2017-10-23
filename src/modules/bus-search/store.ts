import { BusSearchActions } from './types';
import { IAction, IConfig } from '../../types';
import { IBusSearchState } from './types';
import { BusSearch } from '../../types/data-types';
import { BusCodes } from '../../types/enums';

export function createBusSearchReducer(config: IConfig) {
  return function busSearch(
    state: IBusSearchState = {},
    action: IAction<BusSearchActions, { key: BusCodes, busSearch: BusSearch } | IBusSearchState>
  ): IBusSearchState {

    switch (action.type) {

      case BusSearchActions.RESET_SEARCH_HISTORY: {
        return action.payload as IBusSearchState;
      }

      case BusSearchActions.ADD_TO_HISTORY: {
        const
          { key, busSearch } = action.payload as { key: BusCodes, busSearch: BusSearch },
          newState: IBusSearchState = {},
          existing = state[key] || []
          ;

        let updated = existing.filter(el => el !== busSearch);
        updated = [busSearch].concat(updated);
        updated = updated.slice(0, config.historyDisplayLimit);

        for (let _key of Object.keys(state)) {
          if (_key !== key) {
            newState[_key] = state[_key];
          }
        }

        newState[key] = updated;

        return newState;
      }

      default: {
        return state;
      }
    }
  };
}
