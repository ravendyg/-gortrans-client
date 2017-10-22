import { IMapState } from '../types/state';
import { IConfig } from '../types';
import { BusListSync } from '../types/data-types';

export function getDefaultMapState(config: IConfig): IMapState {
  return {
    lat: config.defaultViewOptions.lat,
    lng: config.defaultViewOptions.lng,
    zoom: config.defaultViewOptions.zoom
  };
}

export function getDefaultBusListSync(): BusListSync {
  return {
    tsp: 0,
    version: '',
    list: []
  };
}

