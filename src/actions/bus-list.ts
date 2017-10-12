import { BusList } from '../types/data-types';
import { IAction } from '../types';
import { IBusListState } from '../types/state';
import { BusListActions, IBusListAction } from '../types/action-types';

export function createBusListActions(
  dispatch: (action: IAction<BusListActions, IBusListState>) => void
): IBusListAction {

  function updateBusList(list: BusList []) {
    dispatch({
      type: BusListActions.UPDATE_LIST,
      payload: {
        list,
        query: ''
      }
    });
  }

  function updateQuery(query: string) {
    dispatch({
      type: BusListActions.UPDATE_QUERY,
      payload: {
        list: [],
        query
      }
    });
  }

  return {
    updateBusList,
    updateQuery
  };
}
