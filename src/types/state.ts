import { BusList, RouterState, BusSearch } from './data-types';
import { Store } from 'redux';

export interface IReduxState {
  [x: string]: any;
  apiConnection: IApiConnectionState;
  mapState: IMapState;
  appState: RouterState;
  busList: IBusListState;
  translation: ITranslationState;
  busSearch: IBusSearchState;
}

export interface IStore<S> extends Store<S> {

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


export interface IBusSearchState {
  [key: string]: BusSearch [];
}
