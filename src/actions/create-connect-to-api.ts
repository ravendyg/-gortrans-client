import { IAction, IConfig } from '../types';
import { messages } from '../messages';
import { ConnectionAction } from '../types/action-types';

export function createConnectToApi(
  dispatch: (action: IAction<ConnectionAction, SocketIOClient.Socket | Error>) => void,
  syncStorage: Storage,
  io: SocketIOClientStatic,
  config: IConfig
): () => void {

  return function connectToApi(): void {

    const
      apiKey: string | null = syncStorage.getItem('apiKey') || null,
      socket: SocketIOClient.Socket = io.connect(config.apiUrl, { query: { apiKey } })
      ;

    socket.on('connect', establishConnection);
    socket.on(messages.newApiKey, setApiKey);
    socket.on('error', errorConnection);

    function setApiKey(newApiKey: string): void {
      syncStorage.setItem('apiKey', newApiKey);
    }

    function establishConnection(): void {
      dispatch({
        type: ConnectionAction.CONNECTED,
        payload: socket
      });
    }

    function errorConnection(error: Error): void {
      dispatch({
        type: ConnectionAction.ERROR,
        payload: error
      });
    }
  };
}
