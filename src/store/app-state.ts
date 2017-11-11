import { ControlActions } from 'src/types/action-types';
import { IAction } from 'src/types';
import { RouterState } from 'src/types/data-types';
import { assertNever } from 'src/services/assertNever';

export function appState(
  state: RouterState = RouterState.BLANK,
  action: IAction<ControlActions, RouterState>
): RouterState {
  switch (action.type) {

    case ControlActions.GO_TO: {
      return action.payload;
    }

    default: {
      assertNever(action.type);
      return state;
    }
  }
}
