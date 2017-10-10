import { combineReducers, createStore } from 'redux';
import { apiConnection } from './connection';
import { mapState } from './map-state';
import { IReduxState } from '../types/state';
import { Store as IStore } from 'redux';

const
  app = combineReducers({
    apiConnection, mapState
  }),
  win: any = window
  ;

export const Store = createStore(
  app,
  win.__REDUX_DEVTOOLS_EXTENSION__ && win.__REDUX_DEVTOOLS_EXTENSION__()
) as IStore<IReduxState>;
