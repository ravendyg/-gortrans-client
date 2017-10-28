import { combineReducers, createStore, Reducer } from 'redux';
// reducers
import { apiConnection } from './connection';
import { createMapState } from './map-state';
import { appState } from './app-state';
import { translation } from './translation';
import { IStore, IReduxState } from '../types/state';
import { IViewStorageService } from '../types/services';
import { IConfig } from '../types';

export function storeFactory(storageService: IViewStorageService, config: IConfig): IStore {
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
      translation,
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
