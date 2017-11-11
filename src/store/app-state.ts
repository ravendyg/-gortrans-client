import { ControlActions } from 'src/types/action-types';
import { RouterState } from 'src/types/data-types';
import { assertNever } from 'src/services/assertNever';
import { ControlActionsType } from 'src/actions/control';

export function appState(
  state: RouterState = RouterState.BLANK,
  action: ControlActionsType
): RouterState {

  let newState = state;

  switch (action.type) {

    case ControlActions.GO_TO: {
      newState = action.payload;
      break;
    }

    default: {
      assertNever(action.type);
    }
  }

  return newState;
}
