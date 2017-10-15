import { IConfig } from '../types';
import { IStore, IReduxState, IMapState, IBusSearchState } from '../types/state';
import { BusListSync } from '../types/data-types';
import { IStorageService } from '../types/services';
import { getDefaultBusListSync, getDefaultBusSearch, getDefaultMapState } from './defaults';

/**
 * @throws Error('bad entry')
 */
function verifyStorageEntry(entry: any): void {
  if (!entry || typeof entry !== 'object') {
    throw new Error('bad entry');
  }
}

export function createStorageService(storage: Storage, config: IConfig): IStorageService {

  function getAsync<T>(key: string, getDefault: () => T): Promise<T> {
    let res: T;
    try {
      const resStr = storage.getItem(key) || '';
      res = JSON.parse(resStr);
      verifyStorageEntry(res);
    } catch (err) {
      res = getDefault();
    }
    return Promise.resolve(res);
  }


  function getDefaultViewOptions(): IMapState {
    let res: IMapState;
    try {
      const resStr = storage.getItem(config.keys.localViewParams) || '';
      res = JSON.parse(resStr);
      verifyStorageEntry(res);
    } catch (err) {
      res = getDefaultMapState(config);
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
    return getAsync<BusListSync>(config.keys.busListSync, getDefaultBusListSync);
  }

  function setBusList(busListSync: BusListSync) {
    storage.setItem(config.keys.busListSync, JSON.stringify(busListSync));
  }


  function getBusSearch(): Promise<IBusSearchState> {
    return getAsync<IBusSearchState>(config.keys.busSearch, getDefaultBusSearch);
  }

  function setBusSearch(busSearch: IBusSearchState) {
    storage.setItem(config.keys.busSearch, JSON.stringify(busSearch));
  }

  return {
    getDefaultViewOptions,
    watchViewOptions,

    getBusList,
    setBusList,

    getBusSearch,
    setBusSearch,
  };
}
