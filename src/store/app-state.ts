import { ControlActions } from '../types/action-types';
import { IAction } from '../types';
import { RouterState } from '../types/data-types';

export function appState(
  state: RouterState = RouterState.BLANK,
  action: IAction<ControlActions, RouterState>
): RouterState {
  switch (action.type) {

    case ControlActions.GO_TO: {
      return action.payload;
    }

    default: {
      return state;
    }
  }
}
