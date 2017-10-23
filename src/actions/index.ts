import { IMainAction } from '../types/action-types';
import { IAction } from '../types';
import { createControlActions } from '../actions/control';
import { createLeafletActions } from '../actions/leaflet';

export function createActions(dispatch: (action: IAction<any, any>) => void): IMainAction {
  const
    controlActions = createControlActions(dispatch),
    leafletActions = createLeafletActions(dispatch),

    actions: IMainAction = {
      controlActions,
      leafletActions,
    }
    ;

  return actions;
}
