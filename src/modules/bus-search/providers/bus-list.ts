import { IConfig } from 'src/types';
import { IStore } from 'src/types/state';
import { BusListSyncResponse, BusListSync } from 'src/types/data-types';
import { IBusListAction } from 'src/modules/bus-search/types';
import { IStorageService } from 'src/types/services';
import { messages } from 'src/messages';

export function loadBusList(
  actions: IBusListAction,
  storageService: IStorageService<BusListSync>,
  store: IStore,
  config: IConfig,
  date: DateConstructor
): Promise<void> {

  let lastSyncInfo: BusListSync;

  return storageService.getVal()
  .then((data: BusListSync) => {
    lastSyncInfo = data;

    const
      tmp = date.now(),
      connection = store.getState().apiConnection.socket,
      syncOutdated = lastSyncInfo.tsp + config.syncPeriod < tmp
      ;

    if (connection && syncOutdated) {
      connection.on(messages.syncBusListResponse, updateBusListSyncInfo);
      connection.emit(messages.syncBusListRequest, lastSyncInfo.version);
    } else {
      actions.updateBusList(data.list);
    }
  })
  .catch((err: Error) => {
    console.error(err);
    actions.updateBusList([]);
  });

  function updateBusListSyncInfo(msg: BusListSyncResponse) {
    lastSyncInfo.tsp = msg.tsp;
    if (msg.version) {
      lastSyncInfo.version = msg.version;
    }
    if (msg.list) {
      lastSyncInfo.list = msg.list;
      actions.updateBusList(msg.list);
    }

    storageService.setVal(lastSyncInfo);
  }

}
