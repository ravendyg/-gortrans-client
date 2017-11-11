import { ConnectionAction } from 'src/types/action-types';
import { IApiConnectionState } from 'src/types/state';
import { assertNever } from 'src/services/assertNever';
import { ConnectApiActionTypes } from 'src/actions/connect-to-api';

export function apiConnection(
  state: IApiConnectionState = { socket: null, error: null },
  action: ConnectApiActionTypes
): IApiConnectionState {

  let newState = state;

  switch (action.type) {

    case ConnectionAction.CONNECTED: {
      newState = {
        socket: action.payload,
        error: null,
      };
      break;
    }

    case ConnectionAction.CONNECTING: {
      newState = {
        socket: null,
        error: null,
      };
      break;
    }

    case ConnectionAction.ERROR: {
      newState = {
        socket: null,
        error: action.payload,
      };
      break;
    }

    default: {
      assertNever(action);
    }
  }

  return newState;
}

