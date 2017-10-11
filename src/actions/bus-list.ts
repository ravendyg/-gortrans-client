import { ListMarsh } from '../types/data-types';
import { IAction } from '../types';
import { BusListPayload } from '../types/state';
import { BusListActions, IBusListAction } from '../types/action-types';

export function createBusListActions(
  dispatch: (action: IAction<BusListActions, BusListPayload>) => void
): IBusListAction {

  function updateBusList(list: ListMarsh []) {
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
