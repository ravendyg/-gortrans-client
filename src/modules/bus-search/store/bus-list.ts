import { BusListActions, IBusListState } from 'src/modules/bus-search/types';
import { IAction } from 'src/types';
import { getDefaultBusList } from 'src/modules/bus-search/defaults';
import { assertNever } from 'src/services/assertNever';

export function createBusListReducer() {
  return function busList(
    state: IBusListState = getDefaultBusList(),
    action: IAction<BusListActions, IBusListState>
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
