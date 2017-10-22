import { createBusSearchProvider } from './providers/bus-search';
import { createBusSearchActions } from './actions/bus-search';
import { IBusSearchState } from '../../types/state';
import { IStorageService } from '../../types/services';
import { IStore, IReduxState } from '../../types/state';

// TODO: move this initialisation into index.ts

export function createBusSearch(store: IStore<IReduxState>, storageService: IStorageService<IBusSearchState>) {
  const
    busSearchAction = createBusSearchActions(store.dispatch),
    busSearchProvider = createBusSearchProvider(busSearchAction, storageService)
    ;

  busSearchProvider.subscribe(store);
}
