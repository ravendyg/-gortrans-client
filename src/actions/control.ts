import { ControlActions, IControlAction } from '../types/action-types';
import { RouterState } from '../types/data-types';

export type ControlActionsType = {
  type: ControlActions.GO_TO;
  payload: RouterState;
};

export function createControlActions(
  dispatch: (action: ControlActionsType) => void
): IControlAction {

  function goToRoot(): void {
    dispatch({
      type: ControlActions.GO_TO,
      payload: RouterState.BLANK
    });
  }


  function goTo(newState: RouterState): void {
    dispatch({
      type: ControlActions.GO_TO,
      payload: newState
    });
  }

  return {
    goTo,
    goToRoot,
  };
}
