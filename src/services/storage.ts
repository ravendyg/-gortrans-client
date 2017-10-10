import { IConfig } from '../types';
import { IStore, IReduxState, IMapStateData } from '../types/state';

export interface IStorageService {
  getDefaultViewOptions: () => IMapStateData;
  watchViewOptions: (store: IStore<IReduxState>) => void;
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

  function watchViewOptions(store: IStore<IReduxState>) {
    let oldState: IMapStateData;
    store.subscribe(() => {
      const mapState = store.getState().mapState;
      if (mapState !== oldState) {
        oldState = mapState;
        setDefaultViewOptions(oldState);
      }
    });
  }

  return {
    getDefaultViewOptions,
    watchViewOptions
  };
}
