import { BusListActions, IBusListState } from '../types';
import { IAction } from '../../../types';
import { getDefaultBusList } from '../defaults';

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

      case BusListActions.SELECT_TYPE: {
        newState = {
          ...state,
          type: action.payload.type,
        };
        break;
      }
    }

    return newState;
  };
}
