import { IAction } from '../types';
import { ControlActions, IControlAction } from '../types/action-types';

export function createControlActions(
  dispatch: (action: IAction<ControlActions, null>) => void
): IControlAction {

  function goToRoot(): void {
    dispatch({
      type: ControlActions.GO_TO_ROOT,
      payload: null
    });
  }

  function showSearch(): void {
    dispatch({
      type: ControlActions.SHOW_SEARCH,
      payload: null
    });
  }

  function showSettings(): void {
    dispatch({
      type: ControlActions.SHOW_SETTINGS,
      payload: null
    });
  }

  return {
    goToRoot,
    showSearch,
    showSettings,
  };
}
