import { IConfig } from '../types';
import { IStore, IReduxState, IMapState } from '../types/state';
import { BusListSync } from '../types/data-types';
import { IStorageService } from '../types/services';

/**
 * @throws Error('bad entry')
 */
function verifyStorageEntry(entry: any): void {
  if (!entry || typeof entry !== 'object') {
    throw new Error('bad entry');
  }
}

export function createStorageService(storage: Storage, config: IConfig): IStorageService {

  function getDefaultViewOptions(): IMapState {
    let res: IMapState;
    try {
      const resStr = storage.getItem(config.keys.localViewParams) || '';
      res = JSON.parse(resStr);
      verifyStorageEntry(res);
    } catch (err) {
      res = {
        lat: config.defaultViewOptions.lat,
        lng: config.defaultViewOptions.lng,
        zoom: config.defaultViewOptions.zoom
      };
    }

    return res;
  }

  function setDefaultViewOptions(viewOptions: IMapState) {
    storage.setItem(config.keys.localViewParams, JSON.stringify(viewOptions));
  }

  // TODO: extract to a provider?
  function watchViewOptions(store: IStore<IReduxState>) {
    let oldState: IMapState;
    store.subscribe(() => {
      const mapState = store.getState().mapState;
      if (mapState !== oldState) {
        oldState = mapState;
        setDefaultViewOptions(oldState);
      }
    });
  }

  function getBusList(): Promise<BusListSync> {
    // probably should use indexeddb, but all data including route lines is about 3-4 MB; will try to stay with localStorage
    let busListSync: BusListSync;
    try {
      const busListSyncInfoStr = storage.getItem(config.keys.busListSync) || '';
      busListSync = JSON.parse(busListSyncInfoStr);
      verifyStorageEntry(busListSync);
    } catch (err) {
      busListSync = {
        tsp: 0,
        version: '',
        list: []
      };
    }
    return Promise.resolve(busListSync);
  }

  function setBusList(busListSync: BusListSync) {
    storage.setItem(config.keys.busListSync, JSON.stringify(busListSync));
  }

  return {
    getDefaultViewOptions,
    watchViewOptions,

    getBusList,
    setBusList,
  };
}
