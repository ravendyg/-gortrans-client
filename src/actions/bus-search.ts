import { BusSearch } from '../types/data-types';
import { IAction } from '../types';
import { IBusSearchState } from '../types/state';
import { BusSearchActions, IBusSearchAction } from '../types/action-types';
import { BusCodes } from '../types/enums';

export function createBusSearchActions(
  dispatch: (action: IAction<
    BusSearchActions,
    { key: BusCodes, busSearch: BusSearch } | IBusSearchState
  >) => void
): IBusSearchAction {

  function updateHistory(key: BusCodes, busSearch: BusSearch) {
    dispatch({
      type: BusSearchActions.ADD_TO_HISTORY,
      payload: {
        key, busSearch
      }
    });
  }

  function updateAllHistory(busSearch: IBusSearchState) {
    dispatch({
      type: BusSearchActions.RESET_SEARCH_HISTORY,
      payload: busSearch
    });
  }

  return {
    updateHistory,
    updateAllHistory
  };
}
