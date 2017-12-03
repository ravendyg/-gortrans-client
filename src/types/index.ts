import { IMapState } from 'src/types/state';
import { BusListSync } from 'src/types/data-types';
import { IStore } from 'src/types/state';

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
