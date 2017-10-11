import { ListMarsh } from './data-types';
import { Store } from 'redux';

export interface IReduxState {
  [x: string]: any;
  apiConnection: {
    data: SocketIOClient.Socket | null;
    error: Error | null;
  };
  mapState: IMapState;
}

export interface IStore<S> extends Store<S> {

}

export declare type ConnectionPayload = SocketIOClient.Socket | Error | null;

export interface IApiConnectionState {
  socket: SocketIOClient.Socket | null;
  error: Error | null;
}


export declare type MapStatePayload = {
  zoom?: number;
  lat?: string;
  lng?: string;
};

export interface IMapState {
  zoom: number;
  lat: string;
  lng: string;
}


export declare type BusListPayload = {
  list: ListMarsh [];
  query: string;
};

export interface IBusListState {
  list: ListMarsh [];
  query: string;
}
