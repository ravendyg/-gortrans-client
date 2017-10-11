import { IAction, IConfig } from '../types';
import { messages } from '../messages';
import { ConnectionAction } from '../types/action-types';

export function createConnectToApi(
  dispatch: (action: IAction<ConnectionAction, SocketIOClient.Socket | Error | null>) => void,
  syncStorage: Storage,
  io: SocketIOClientStatic,
  config: IConfig
): () => void {

  return function connectToApi(): void {

    const
      apiKey: string | null = syncStorage.getItem('apiKey') || null,
      socket: SocketIOClient.Socket = io.connect(
        config.apiUrl,
        {
          query: {
            apiKey,
            version: config.apiVersion,
            lang: 'ru'  // hardcode for now
          }
        }
      )
      ;

    socket.on('connect', onConnect);
    socket.on(messages.newApiKey, setApiKey);
    socket.on('error', onError);
    socket.on('disconnect', onDisconnect);

    function onDisconnect() {
      dispatch({
        type: ConnectionAction.CONNECTING,
        payload: null
      });
    }

    function setApiKey(newApiKey: string): void {
      syncStorage.setItem('apiKey', newApiKey);
    }

    function onConnect(): void {
      dispatch({
        type: ConnectionAction.CONNECTED,
        payload: socket
      });
    }

    function onError(error: Error): void {
      dispatch({
        type: ConnectionAction.ERROR,
        payload: error
      });
    }
  };
}