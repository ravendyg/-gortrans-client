import { Store } from 'redux';

export interface IReduxState {
  [x: string]: any;
  apiConnection: {
    data: SocketIOClient.Socket | null;
    error: Error | null;
  };
}

export interface IStore<S> extends Store<S> {

}
