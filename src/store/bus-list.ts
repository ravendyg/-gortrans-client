import { BusListActions } from '../types/action-types';
import { IAction } from '../types';
import { IBusListState } from '../types/state';
import { BusCodesOrdered } from '../types/enums';

const defaultBusList: IBusListState = {
  list: BusCodesOrdered.map(type => ({ type, ways: [] })),
  query: ''
};

export function busList(
  state: IBusListState = defaultBusList,
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
}
