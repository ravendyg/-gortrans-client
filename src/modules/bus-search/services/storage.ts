import { IConfig } from '../../../types';
import { IBusSearchState } from '../../../types/state';
import { IStorageService } from '../../../types/services';
import { getDefaultBusSearch } from './defaults';
import { getAsync } from '../../../services/storage';

export function createStorageService(storage: Storage, config: IConfig): IStorageService<IBusSearchState> {

  function getVal(): Promise<IBusSearchState> {
    return getAsync<IBusSearchState>(storage, config.keys.busSearch, getDefaultBusSearch);
  }

  function setVal(busSearch: IBusSearchState) {
    storage.setItem(config.keys.busSearch, JSON.stringify(busSearch));
  }

  return {
    getVal,
    setVal,
  };
}
