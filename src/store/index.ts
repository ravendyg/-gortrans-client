import {combineReducers, createStore} from 'redux';
import {connectionStore} from './connection';

const app = combineReducers({
  connectionStore
});

export const Store = createStore(app);
