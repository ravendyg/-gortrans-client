import { BusListActions, IBusListState } from 'src/modules/bus-search/types';
import { getDefaultBusList } from 'src/modules/bus-search/defaults';
import { assertNever } from 'src/services/assertNever';
import { BusListActionType } from 'src/modules/bus-search/actions/bus-list';

export function createBusListReducer() {
  return function busList(
    state: IBusListState = getDefaultBusList(),
    action: BusListActionType,
  ): IBusListState {

    let newState = state;

    switch (action.type) {

      case BusListActions.UPDATE_LIST: {
        newState = {
          ...state,
          list: action.payload.list,
        };
        break;
      }

      case BusListActions.UPDATE_QUERY: {
        newState = {
          ...state,
          query: action.payload.query,
        };
        break;
      }

      default: {
        assertNever(action.type);
      }

    }

    return newState;
  };
}
