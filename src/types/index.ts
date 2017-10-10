import { IMapStateData } from './state';

export interface IAction<T, P> {
  type: T;
  payload: P;
}

export interface IConfig {
  apiUrl: string;
  mapOptions: {
    minZoom: number,
    maxZoom: number,
    maxBounds: L.LatLngBounds
  };
  tileProvider: string;
  defaultViewOptions: IMapStateData;
  keys: {
    localViewParams: string
  };
}

export interface ICtor<T> {
  new(...args: any[]): T;
}
