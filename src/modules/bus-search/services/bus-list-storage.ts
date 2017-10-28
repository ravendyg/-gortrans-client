import { IConfig } from '../../../types';
import { BusListSync } from '../../../types/data-types';
import { IStorageService } from '../../../types/services';
import { getAsync } from '../../../services/storage';

export function createBusListStorageService(storage: Storage, config: IConfig): IStorageService<BusListSync> {

  function getDefault(): BusListSync {
    return {
      list: [],
      tsp: 0,
      version: ''
    };
  }

  function getVal(): Promise<BusListSync> {
    return getAsync<BusListSync>(storage, config.keys.busListSync, getDefault);
  }

  function setVal(busListSync: BusListSync) {
    storage.setItem(config.keys.busListSync, JSON.stringify(busListSync));
  }

  return {
    getVal,
    setVal,
  };
}
