import { IStore, IReduxState, IBusSearchState } from '../types/state';
import { IProvider } from '../types/providers';
import { IBusSearchAction } from '../types/action-types';
import { IStorageService } from '../types/services';

export function createBusSearchProvider(
  actions: IBusSearchAction,
  storageService: IStorageService,
): IProvider {

  let _busSearch: IBusSearchState;

  const loaded = new Promise(resolve => {
    storageService.getBusSearch()
    .then((data: IBusSearchState) => {
      _busSearch = data;
      actions.updateAllHistory(data);
      resolve();
    })
    .catch(console.error);
  });

  function updateIfRequired(store: IStore<IReduxState>): void {
    const busSearch = store.getState().busSearch;

    if (_busSearch !== busSearch) {
      _busSearch = busSearch;
      storageService.setBusSearch(_busSearch);
    }
  }

  function subscribe(store: IStore<IReduxState>): Promise<void> {
    return loaded.then(() => {
      store.subscribe(() => {
        updateIfRequired(store);
      });
      updateIfRequired(store);
    });
  }

  return {
    subscribe
  };

}
