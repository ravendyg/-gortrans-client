import { IConfig } from 'src/types';
import { IBusSearchState } from 'src/modules/bus-search/types';
import { IStorageService } from 'src/types/services';
import { getDefaultBusSearch } from 'src/modules/bus-search/defaults';
import { getAsync } from 'src/services/storage';

export function createBusSeachStorageService(storage: Storage, config: IConfig): IStorageService<IBusSearchState> {

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
