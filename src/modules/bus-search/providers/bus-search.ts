import { IStore } from 'src/types/state';
import { IBusSearchAction, IBusSearchState } from 'src/modules/bus-search/types';
import { IProvider } from 'src/types/providers';
import { IStorageService } from 'src/types/services';

export function createBusSearchProvider(
  actions: IBusSearchAction,
  storageService: IStorageService<IBusSearchState>,
): IProvider {

  let _busSearch: IBusSearchState;

  const loaded = new Promise(resolve => {
    storageService.getVal()
    .then((data: IBusSearchState) => {
      _busSearch = data;
      actions.updateAllHistory(data);
      resolve();
    })
    .catch(console.error);
  });

  function updateIfRequired(store: IStore): void {
    const busSearch = store.getState().busSearch;

    if (_busSearch !== busSearch) {
      _busSearch = busSearch;
      storageService.setVal(_busSearch);
    }
  }

  function subscribe(store: IStore): Promise<() => void> {
    return loaded.then(() => {
      updateIfRequired(store);
      return store.subscribe(() => {
        updateIfRequired(store);
      });
    });
  }

  return {
    subscribe
  };

}
