import { ConnectionAction } from 'src/types/action-types';
import { IAction } from 'src/types';
import { IApiConnectionState, ConnectionPayload } from 'src/types/state';

export function apiConnection(
  state: IApiConnectionState = { socket: null, error: null },
  action: IAction<ConnectionAction, ConnectionPayload>
): IApiConnectionState {

  switch (action.type) {

    case ConnectionAction.CONNECTED: {
      return {
        socket: (action.payload as SocketIOClient.Socket),
        error: null
      };
    }

    case ConnectionAction.CONNECTING: {
      return {
        socket: null,
        error: null
      };
    }

    case ConnectionAction.ERROR: {
      return {
        socket: null,
        error: (action.payload as Error)
      };
    }

    default: {
      return state;
    }
  }
}
