import { IConfig } from '../types';
import { IStore, IReduxState } from '../types/state';
import { BusListSyncResponse } from '../types/data-types';
import { IBusListProvider } from '../types/providers';
import { IBusListAction } from '../types/action-types';
import { IStorageService } from '../types/services';
import { messages } from '../messages';

export function createBusListProvider(
  actions: IBusListAction,
  storageService: IStorageService,
  config: IConfig,
  date: DateConstructor
): IBusListProvider {

  let
    requested = 0,
    lastSyncInfo = storageService.getBusListSync()
    ;

  function handleResponse(msg: BusListSyncResponse) {
    lastSyncInfo.tsp = requested;

    if (msg.version > lastSyncInfo.version) {
      lastSyncInfo.version = msg.version;
      actions.updateBusList(msg.list);
    }

    storageService.setBusListSync(lastSyncInfo);
  }

  function updateIfRequired(store: IStore<IReduxState>): void {
    const
      tmp = date.now(),
      connection = store.getState().apiConnection.socket,
      syncOutdated = lastSyncInfo.tsp + config.syncPeriod < tmp
      ;

    if (connection && syncOutdated) {
      requested = tmp;
      connection.on(messages.syncBusListResponse, handleResponse);
      connection.emit(messages.syncBusListRequest, lastSyncInfo.version);
    }
  }

  function subscribe(store: IStore<IReduxState>) {
    store.subscribe(() => {
      updateIfRequired(store);
    });

    updateIfRequired(store);
  }

  return {
    subscribe
  };

}
