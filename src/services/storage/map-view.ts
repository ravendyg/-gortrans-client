import { IConfig } from '../../types';
import { IStore, IMapState } from '../../types/state';
import { IViewStorageService } from '../../types/services';
import { getDefaultMapState } from '../defaults';
import { verifyStorageEntry } from './index';

export function createViewStorageService(storage: Storage, config: IConfig): IViewStorageService {

    function getMapViewOptions(): IMapState {
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

    function setMapViewOptions(viewOptions: IMapState) {
      storage.setItem(config.keys.localViewParams, JSON.stringify(viewOptions));
    }

    // TODO: extract to a provider?
    function watchViewOptions(store: IStore) {
      let oldState: IMapState;
      store.subscribe(() => {
        const mapState = store.getState().mapState;
        if (mapState !== oldState) {
          oldState = mapState;
          setMapViewOptions(oldState);
        }
      });
    }

    return {
      getMapViewOptions,
      watchViewOptions,
    };
  }
