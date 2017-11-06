import { createStore, combineReducers, Reducer, } from 'redux';
import { lang } from 'src/store/lang';
import { createBusListReducer } from 'src/modules/bus-search/store/bus-list';
import { createBusSearchReducer } from 'src/modules/bus-search/store/bus-search';
import { IConfig } from 'src/types';

export function createFakeStore() {
  return createStore(
    combineReducers({
      busList: createBusListReducer(),
      busSearch: createBusSearchReducer({historyDisplayLimit: 2} as IConfig),
      lang,
    }) as Reducer<any>
  );
}
