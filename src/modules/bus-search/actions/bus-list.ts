import { BusList } from 'src/types/data-types';
import { IAction } from 'src/types';
import { BusListActions, IBusListAction, IBusListState } from 'src/modules/bus-search/types';
import { cleanQuery } from 'src/services/clean-bus-search-query';

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

  return {
    updateBusList,
    updateQuery,
  };
}
