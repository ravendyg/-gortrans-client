import { BusList, RouterState } from './data-types';
import { Store } from 'redux';

export interface IReduxState {
  [x: string]: any;
  apiConnection: IApiConnectionState;
  mapState: IMapState;
  appState: RouterState;
  busList: IBusListState;
  translation: ITranslationState;
}

export interface IStore extends Store<IReduxState> {
  injectAsyncReducer: (name: string, reducer: any) => void;
}

export declare type ConnectionPayload = SocketIOClient.Socket | Error | null;

export interface IApiConnectionState {
  socket: SocketIOClient.Socket | null;
  error: Error | null;
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


export interface ITranslationState {
  lang: string;
  text: {
    [key: string]: string
  };
}

