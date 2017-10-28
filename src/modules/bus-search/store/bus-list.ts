import { BusListActions } from '../../../types/action-types';
import { IAction } from '../../../types';
import { IBusListState } from '../../.../../../types/state';
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
          list: action.payload.list,
          query: state.query
        };
        break;
      }

      case BusListActions.UPDATE_QUERY: {
        newState = {
          list: state.list,
          query: action.payload.query
        };
        break;
      }
    }

    return newState;
  };
}
