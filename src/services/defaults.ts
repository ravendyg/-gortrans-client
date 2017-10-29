import { IMapState } from 'src/types/state';
import { IConfig } from 'src/types';

export function getDefaultMapState(config: IConfig): IMapState {
  return {
    lat: config.defaultViewOptions.lat,
    lng: config.defaultViewOptions.lng,
    zoom: config.defaultViewOptions.zoom
  };
}


