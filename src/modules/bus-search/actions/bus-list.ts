import { BusList } from 'src/types/data-types';
import { BusListActions, IBusListAction } from 'src/modules/bus-search/types';
import { cleanQuery } from 'src/services/clean-bus-search-query';

export type BusListActionType = {
  type: BusListActions;
  payload: {
    list: BusList [];
    query: string;
  }
};

export function createBusListActions(
  dispatch: (action: BusListActionType) => void
): IBusListAction {

  function updateBusList(list: BusList []) {
    dispatch({
      type: BusListActions.UPDATE_LIST,
      payload: {
        list,
        query: '',
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
      }
    });
  }

  return {
    updateBusList,
    updateQuery,
  };
}
