import { IAction } from '../types';
import { ControlActions, IControlAction } from '../types/action-types';
import { createEmptyPayload } from './empty-payload';

export function createControlActions(
  dispatch: (action: IAction<ControlActions, null>) => void
): IControlAction {

  function zoomIn(): void {
    dispatch({
      type: ControlActions.ZOOM_IN,
      payload: createEmptyPayload()
    });
  }

  function zoomOut(): void {
    dispatch({
      type: ControlActions.ZOOM_OUT,
      payload: createEmptyPayload()
    });
  }

  function toggleSearch(): void {
    dispatch({
      type: ControlActions.TOGGLE_SEARCH,
      payload: createEmptyPayload()
    });
  }

  return {
    zoomIn,
    zoomOut,
    toggleSearch
  };
}
