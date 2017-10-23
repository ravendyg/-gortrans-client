import { IMapState } from './state';
import { BusListSync } from './data-types';
import { IStore } from './state';

export interface IAction<T, P> {
  type: T;
  payload: P;
}

export interface IConfig {
  apiVersion: string;
  apiUrl: string;
  old: boolean;
  mapOptions: {
    minZoom: number;
    maxZoom: number;
    maxBounds: L.LatLngBounds;
  };
  tileProvider: string;
  defaultViewOptions: IMapState;
  defaultBusListSync: BusListSync;
  keys: {
    localViewParams: string;
    busListSync: string;
    busSearch: string;
  };
  syncPeriod: number;
  historyDisplayLimit: number;
}

export interface ICtor<T> {
  new(...args: any[]): T;
}

export interface IWindowProps {
  win: Window;
}

export interface IStoreProps {
  store: IStore;
}
