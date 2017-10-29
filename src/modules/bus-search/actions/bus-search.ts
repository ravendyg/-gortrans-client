import { BusSearch } from 'src/types/data-types';
import { IAction } from 'src/types';
import { IBusSearchState, BusSearchActions, IBusSearchAction } from 'src/modules/bus-search/types';
import { BusCodes } from 'src/types/enums';

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
