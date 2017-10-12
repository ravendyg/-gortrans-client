import { ControlActions } from '../types/action-types';
import { IAction } from '../types';
import { IAppState } from '../types/state';

const defAppState: IAppState = {
  showSearch: false
};

export function appState(
  state: IAppState = defAppState,
  action: IAction<ControlActions, null>
): IAppState {
  switch (action.type) {

    case ControlActions.TOGGLE_SEARCH: {
      return Object.assign({} , state, { showSearch: !state.showSearch });
    }

    default: {
      return state;
    }
  }
}
