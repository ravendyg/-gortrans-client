import { Way } from 'src/types/data-types';
import { IBusSearchState, BusSearchActions, IBusSearchAction } from 'src/modules/bus-search/types';
import { BusCodes } from 'src/types/enums';

export type UpdateHistory = {
  type: BusSearchActions.ADD_TO_HISTORY;
  payload: {
    key: BusCodes;
    way: Way;
  };
};

export type UpdateAllHistory = {
  type: BusSearchActions.RESET_SEARCH_HISTORY;
  payload: IBusSearchState;
};

export type UpdateType = {
  type: BusSearchActions.CHANGE_TAB;
  payload: BusCodes;
};

export type BusSearchActionTypes = UpdateHistory
  | UpdateAllHistory
  | UpdateType
  ;

export function createBusSearchActions(
  dispatch: (action: BusSearchActionTypes) => void
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
