import { BusListActions } from '../types/action-types';
import { IAction } from '../types';
import { BusListPayload, IBusListState } from '../types/state';

const defaultBusList: IBusListState = {
  list: ['0', '1', '2', '7'].map(type => ({ type, ways: [] })),
  query: ''
};

export function busList(
  state: IBusListState = defaultBusList,
  action: IAction<BusListActions, BusListPayload>
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
}
