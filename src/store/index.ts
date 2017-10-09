import { combineReducers, createStore } from 'redux';
import { apiConnection } from './connection';
import { IReduxState } from '../types/state';
import { Store as IStore } from 'redux';

const app = combineReducers({
  apiConnection
});

export const Store = createStore(app) as IStore<IReduxState>;
