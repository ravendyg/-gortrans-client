import { IConfig } from '../../types';
import { BusListSync } from '../../types/data-types';
import { IStorageService } from '../../types/services';
import { getDefaultBusListSync } from '../defaults';
import { getAsync } from './index';

export function createBusListStorageService(storage: Storage, config: IConfig): IStorageService<BusListSync> {

  function getVal(): Promise<BusListSync> {
    return getAsync<BusListSync>(storage, config.keys.busListSync, getDefaultBusListSync);
  }

  function setVal(busListSync: BusListSync) {
    storage.setItem(config.keys.busListSync, JSON.stringify(busListSync));
  }

  return {
    getVal,
    setVal,
  };
}
