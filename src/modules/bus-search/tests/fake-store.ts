import { createStore, combineReducers, Reducer, } from 'redux';
import { getTranslation } from 'src/services/translations';
import { createTranslation } from 'src/store/translation';
import { createBusListReducer } from 'src/modules/bus-search/store/bus-list';
import { createBusSearchReducer } from 'src/modules/bus-search/store/bus-search';
import { IConfig } from 'src/types';

export function createFakeStore() {
  return createStore(
    combineReducers({
      busList: createBusListReducer(),
      busSearch: createBusSearchReducer({historyDisplayLimit: 2} as IConfig),
      translation: createTranslation(getTranslation),
    }) as Reducer<any>
  );
}
