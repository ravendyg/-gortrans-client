import { IConfig } from '../types';
import { IStore } from '../types/state';
import { BusListSyncResponse, BusListSync } from '../types/data-types';
import { IProvider } from '../types/providers';
import { IBusListAction } from '../types/action-types';
import { IStorageService } from '../types/services';
import { messages } from '../messages';

export function createBusListProvider(
  actions: IBusListAction,
  storageService: IStorageService<BusListSync>,
  config: IConfig,
  date: DateConstructor
): IProvider {

  let lastSyncInfo: BusListSync;

  const loaded = new Promise(resolve => {
    storageService.getVal()
    .then((data: BusListSync) => {
      lastSyncInfo = data;
      resolve();
      actions.updateBusList(data.list);
    })
    .catch((err: Error) => {
      console.error(err);
      lastSyncInfo = {
        tsp: 0,
        version: '',
        list: []
      };
      resolve();
      actions.updateBusList([]);
    });
  });

  function updateBusListSyncInfo(msg: BusListSyncResponse) {
    lastSyncInfo.tsp = msg.tsp;
    if (msg.version ) {
      lastSyncInfo.version = msg.version;
    }
    if (msg.list) {
      lastSyncInfo.list = msg.list;
      actions.updateBusList(msg.list);
    }

    storageService.setVal(lastSyncInfo);
  }

  function updateIfRequired(store: IStore): void {
    const
      tmp = date.now(),
      connection = store.getState().apiConnection.socket,
      syncOutdated = lastSyncInfo.tsp + config.syncPeriod < tmp
      ;

    if (connection && syncOutdated) {
      connection.on(messages.syncBusListResponse, updateBusListSyncInfo);
      connection.emit(messages.syncBusListRequest, lastSyncInfo.version);
    }
  }

  function subscribe(store: IStore): Promise<void> {
    return loaded.then(() => {
      store.subscribe(() => {
        if (loaded) {
          updateIfRequired(store);
        }
      });
      updateIfRequired(store);
    });
  }

  return {
    subscribe
  };

}
