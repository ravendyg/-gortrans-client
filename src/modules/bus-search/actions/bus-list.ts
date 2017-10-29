import { BusList } from '../../../types/data-types';
import { IAction } from '../../../types';
import { BusListActions, IBusListAction, IBusListState } from '../types';
import { cleanQuery } from '../../../services/clean-bus-search-query';

export function createBusListActions(
  dispatch: (action: IAction<BusListActions, IBusListState>) => void
): IBusListAction {

  function updateBusList(list: BusList []) {
    dispatch({
      type: BusListActions.UPDATE_LIST,
      payload: {
        list,
        query: '',
        type: '0',
      }
    });
  }

  function updateQuery(rawQuery: string) {
    const query = cleanQuery(rawQuery);

    dispatch({
      type: BusListActions.UPDATE_QUERY,
      payload: {
        list: [],
        query,
        type: '0',
      }
    });
  }

  function updateType(type: string) {
    dispatch({
      type: BusListActions.SELECT_TYPE,
      payload: {
        list: [],
        query: '',
        type,
      }
    });
  }

  return {
    updateBusList,
    updateQuery,
    updateType,
  };
}
