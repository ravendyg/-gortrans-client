import { ControlActions } from '../types/action-types';
import { IAction } from '../types';
import { IAppState } from '../types/state';
import { RouterState } from '../types/data-types';

const defAppState: IAppState = {
  routerState: RouterState.BLANK
};

export function appState(
  state: IAppState = defAppState,
  action: IAction<ControlActions, null>
): IAppState {
  switch (action.type) {

    case ControlActions.SHOW_SEARCH: {
      return Object.assign({} , state, { routerState: RouterState.SEARCH });
    }

    case ControlActions.SHOW_SETTINGS: {
      return Object.assign({} , state, { routerState: RouterState.SETTINGS });
    }

    case ControlActions.GO_TO_ROOT: {
      return Object.assign({} , state, { routerState: RouterState.BLANK });
    }

    default: {
      return state;
    }
  }
}
