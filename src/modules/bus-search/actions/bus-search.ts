import { Way } from 'src/types/data-types';
import { IAction } from 'src/types';
import { IBusSearchState, BusSearchActions, IBusSearchAction } from 'src/modules/bus-search/types';
import { BusCodes } from 'src/types/enums';

export function createBusSearchActions(
  dispatch: (action: IAction<
    BusSearchActions,
    { key: BusCodes, way: Way } | IBusSearchState | BusCodes
  >) => void
): IBusSearchAction {

  function updateHistory(key: BusCodes, way: Way) {
    dispatch({
      type: BusSearchActions.ADD_TO_HISTORY,
      payload: {
        key, way
      }
    });
  }

  function updateAllHistory(busSearch: IBusSearchState) {
    dispatch({
      type: BusSearchActions.RESET_SEARCH_HISTORY,
      payload: busSearch
    });
  }

  function updateType(busCode: BusCodes) {
    dispatch({
      type: BusSearchActions.CHANGE_TAB,
      payload: busCode,
    });
  }

  return {
    updateHistory,
    updateAllHistory,
    updateType
  };
}
