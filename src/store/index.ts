import { combineReducers, createStore } from 'redux';
import { apiConnection } from './connection';
import { createMapState } from './map-state';
import { IReduxState } from '../types/state';
import { Store as IStore } from 'redux';
import { IStorageService } from '../types/services';
import { IConfig } from '../types';

export function storeFactory(storageService: IStorageService, config: IConfig) {
  const
    defViewOptions = storageService.getDefaultViewOptions(),
    app = combineReducers({
      apiConnection,
      mapState: createMapState(defViewOptions, config)
    }),
    win: any = window,
    Store = createStore(
      app,
      win && win.__REDUX_DEVTOOLS_EXTENSION__ && win.__REDUX_DEVTOOLS_EXTENSION__()
    ) as IStore<IReduxState>
    ;

  return Store;
}
