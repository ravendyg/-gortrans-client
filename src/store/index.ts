import { combineReducers, createStore } from 'redux';
import { apiConnection } from './connection';
import { createMapState } from './map-state';
import { IReduxState } from '../types/state';
import { Store as IStore } from 'redux';
import { createStorageService } from '../services/storage';
import { config } from '../config';

const
  storageService = createStorageService(localStorage, config),
  app = combineReducers({
    apiConnection,
    mapState: createMapState(storageService)
  }),
  win: any = window
  ;

export const Store = createStore(
  app,
  win.__REDUX_DEVTOOLS_EXTENSION__ && win.__REDUX_DEVTOOLS_EXTENSION__()
) as IStore<IReduxState>;
