import { ControlActions } from '../types/action-types';
import { IAction } from '../types';
import { IAppState } from '../types/state';

const defAppState: IAppState = {
  showSearch: false
};

export function appState(
  state: IAppState = defAppState,
  action: IAction<ControlActions, null>
): IAppState {
  switch (action.type) {

    case ControlActions.SHOW_SEARCH: {
      return Object.assign({} , state, { showSearch: true });
    }

    case ControlActions.HIDE_SEARCH: {
      return Object.assign({} , state, { showSearch: false });
    }

    default: {
      return state;
    }
  }
}
