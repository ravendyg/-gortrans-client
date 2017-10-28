import { IMapState } from '../types/state';
import { IConfig } from '../types';

export function getDefaultMapState(config: IConfig): IMapState {
  return {
    lat: config.defaultViewOptions.lat,
    lng: config.defaultViewOptions.lng,
    zoom: config.defaultViewOptions.zoom
  };
}


