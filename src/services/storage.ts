import { IConfig } from '../types';
import { IMapStateData } from '../types/state';

export function getDefaultViewOptions(storage: Storage, config: IConfig): IMapStateData {
  let res: IMapStateData;
  try {
    const resStr = storage.getItem(config.keys.localViewParams) || '';
    res = JSON.parse(resStr);
    if (!resStr || typeof res !== 'object') {
      throw new Error('bad entry');
    }
  } catch (err) {
    res = {
      lat: config.defaultViewOptions.lat,
      lng: config.defaultViewOptions.lng,
      zoom: config.defaultViewOptions.zoom
    };
  }

  return res;
}
