import { IAction } from '../types';
import { ControlActions, IControlAction } from '../types/action-types';

export function createControlActions(
  dispatch: (action: IAction<ControlActions, null>) => void
): IControlAction {

  function showSearch(): void {
    dispatch({
      type: ControlActions.SHOW_SEARCH,
      payload: null
    });
  }

  function hideSearch(): void {
    dispatch({
      type: ControlActions.HIDE_SEARCH,
      payload: null
    });
  }

  return {
    showSearch,
    hideSearch
  };
}
