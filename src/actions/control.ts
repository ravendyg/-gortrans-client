import { IAction } from '../types';
import { ControlActions, IControlAction } from '../types/action-types';

export function createControlActions(
  dispatch: (action: IAction<ControlActions, null>) => void
): IControlAction {

  function toggleSearch(): void {
    dispatch({
      type: ControlActions.TOGGLE_SEARCH,
      payload: null
    });
  }

  return {
    toggleSearch,
  };
}
