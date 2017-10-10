import { IConfig } from '../types';
import { IMapStateData } from '../types/state';

export interface IStorageService {
  getDefaultViewOptions: () => IMapStateData;
  setDefaultViewOptions: (val: IMapStateData) => void;
}

export function createStorageService(storage: Storage, config: IConfig): IStorageService {

  function getDefaultViewOptions(): IMapStateData {
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

  function setDefaultViewOptions(viewOptions: IMapStateData) {
    storage.setItem(config.keys.localViewParams, JSON.stringify(viewOptions));
  }

  return {
    getDefaultViewOptions,
    setDefaultViewOptions
  };
}
