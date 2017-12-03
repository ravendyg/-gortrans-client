import { combineReducers, createStore, Reducer } from 'redux';
// reducers
import { apiConnection } from 'src/store/connection';
import { createMapState } from 'src/store/map-state';
import { appState } from 'src/store/app-state';
import { lang } from 'src/store/lang';
import { IStore, IReduxState } from 'src/types/state';
import { IViewStorageService } from 'src/types/services';
import { IConfig } from 'src/types';

export function storeFactory(
  storageService: IViewStorageService, config: IConfig,
): IStore {
  const
    defViewOptions = storageService.getMapViewOptions(),
    asyncReducers: any = {},
    app = createReducer(),
    win: any = window,
    Store = createStore(
      app,
      win && win.__REDUX_DEVTOOLS_EXTENSION__ && win.__REDUX_DEVTOOLS_EXTENSION__()
    ) as IStore
    ;

  Store.injectAsyncReducer = injectAsyncReducer;

  function createReducer(): Reducer<IReduxState> {
    return combineReducers(Object.assign({
      apiConnection,
      mapState: createMapState(defViewOptions, config),
      appState,
      lang,
    }, asyncReducers));
  }

  function injectAsyncReducer(name: string, reducer: any): void {
    if (!asyncReducers[name]) {
      asyncReducers[name] = reducer;
      Store.replaceReducer(createReducer());
    }
  }

  return Store;
}
