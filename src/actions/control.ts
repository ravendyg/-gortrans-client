import { IAction } from '../types';
import { ControlActions, IControlAction } from '../types/action-types';
import { RouterState } from '../types/data-types';

export function createControlActions(
  dispatch: (action: IAction<ControlActions, RouterState>) => void
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
