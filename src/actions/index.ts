import { IActions, IActionDeps } from '../types/action-types';

import { createControlActions } from '../actions/control';
import { createLeafletActions } from '../actions/leaflet';
import { createBusListActions } from '../actions/bus-list';

export function createActions({ dispatch }: IActionDeps): IActions {
  const
    controlActions = createControlActions(dispatch),
    leafletActions = createLeafletActions(dispatch),
    busListActions = createBusListActions(dispatch),

    actions: IActions = {
      controlActions,
      leafletActions,
      busListActions,
      addActions: () => {/**/},
    },

    addActions = (name: string, newActions: any) => {
      actions[name] = newActions;
    }
    ;

  actions.addActions = addActions;

  return actions;
}
