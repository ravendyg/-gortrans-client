import { BusListActions } from '../../../types/action-types';
import { IAction } from '../../../types';
import { IBusListState } from '../../.../../../types/state';
import { getDefaultBusList } from '../defaults';

export function createBusListReducer() {
  return function busList(
    state: IBusListState = getDefaultBusList(),
    action: IAction<BusListActions, IBusListState>
  ): IBusListState {

    switch (action.type) {

      case BusListActions.UPDATE_LIST: {
        return {
          list: action.payload.list,
          query: state.query
        };
      }

      case BusListActions.UPDATE_QUERY: {
        return {
          list: state.list,
          query: action.payload.query
        };
      }

      default: {
        return state;
      }
    }
  };
}
