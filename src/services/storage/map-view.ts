import { IConfig } from 'src/types';
import { IStore, IMapState } from 'src/types/state';
import { IViewStorageService } from 'src/types/services';
import { getDefaultMapState } from 'src/services/defaults';
import { verifyStorageEntry } from 'src/services/storage';

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
