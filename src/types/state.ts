export interface IReduxState {
  [x: string]: any;
  apiConnection: {
    data: SocketIOClient.Socket | null;
    error: Error | null;
  };
}
