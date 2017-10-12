import { BusList } from './data-types';
import { Store } from 'redux';

export interface IReduxState {
  [x: string]: any;
  apiConnection: IApiConnectionState;
  mapState: IMapState;
  appState: IAppState;
}

export interface IStore<S> extends Store<S> {

}

export declare type ConnectionPayload = SocketIOClient.Socket | Error | null;

export interface IApiConnectionState {
  socket: SocketIOClient.Socket | null;
  error: Error | null;
}


export interface IAppState {
  showSearch: boolean;
}


export interface IMapState {
  zoom: number;
  lat: string;
  lng: string;
}


export interface IBusListState {
  list: BusList [];
  query: string;
}
