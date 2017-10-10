import { Store } from 'redux';

export interface IReduxState {
  [x: string]: any;
  apiConnection: {
    data: SocketIOClient.Socket | null;
    error: Error | null;
  };
  mapState: IMapStateData;
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

export interface IMapStateData {
  zoom: number;
  lat: string;
  lng: string;
}
