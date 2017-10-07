import { IAction, IConfig } from '../types';
import { messages } from '../messages';
import { ConnectionAction } from '../types/action-types';

export function createConnectToApi(
  dispatch: (action: IAction<ConnectionAction, SocketIOClient.Socket>) => void,
  syncStorage: Storage,
  io: SocketIOClientStatic,
  config: IConfig
): () => void {

  return function connectToApi(): void {

    const
      apiKey: string | null = syncStorage.getItem('apiKey') || null,
      socket: SocketIOClient.Socket = io.connect(config.apiUrl, { query: { apiKey } })
      ;

    dispatch({
      type: ConnectionAction.CONNECTING,
      payload: {
        data: null,
        error: null
      }
    });

    socket.on('connect', establishConnection);
    socket.on(messages.newApiKey, getApiKey);
    socket.on('error', errorConnection);

    function getApiKey(newApiKey: string) {
      syncStorage.setItem('apiKey', newApiKey);
    }

    function establishConnection() {
      dispatch({
        type: ConnectionAction.CONNECTED,
        payload: {
          data: socket,
          error: null
        }
      });
    }

    function errorConnection(error: Error) {
      dispatch({
        type: ConnectionAction.ERROR,
        payload: {
          data: null,
          error
        }
      });
    }
  };
}
