import { IAction } from '../types';
import { ControlActions, IControlAction } from '../types/action-types';

export function createControlActions(
  dispatch: (action: IAction<ControlActions, null>) => void
): IControlAction {

  function zoomIn(): void {
    dispatch({
      type: ControlActions.ZOOM_IN,
      payload: null
    });
  }

  function zoomOut(): void {
    dispatch({
      type: ControlActions.ZOOM_OUT,
      payload: null
    });
  }

  function toggleSearch(): void {
    dispatch({
      type: ControlActions.TOGGLE_SEARCH,
      payload: null
    });
  }

  return {
    zoomIn,
    zoomOut,
    toggleSearch
  };
}
