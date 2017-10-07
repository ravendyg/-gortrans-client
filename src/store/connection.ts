import {ConnectionAction} from '../types/action-types';
import {IAction, IPayload} from '../types';

export function connectionStore(
  state: IPayload<SocketIOClient.Socket> = { data: null, error: null },
  action: IAction<ConnectionAction, SocketIOClient.Socket>
): IPayload<SocketIOClient.Socket> {

  switch (action.type) {

    case ConnectionAction.CONNECTED: {
      return {
        data: action.payload.data,
        error: null
      };
    }

    case ConnectionAction.ERROR: {
      return {
        data: null,
        error: action.payload.error
      };
    }

    default: {
      return state;
    }
  }
}
