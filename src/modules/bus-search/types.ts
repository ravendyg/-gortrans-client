import { Store } from 'redux';
import { BusList, Way } from 'src/types/data-types';
import { BusCodes } from 'src/types/enums';
import { IReduxState } from 'src/types/state';

export interface IBusSearchState {
  lists: {
    [index: string/*BusCodes*/]: Way []
  };
  activeTab: BusCodes;
}

export declare type BusSearchStateParticle = { key: BusCodes, way: Way };

export interface IBusSearchAction {
  updateHistory: (key: BusCodes, way: Way) => void;
  updateAllHistory: (busSearch: IBusSearchState) => void;
  updateType: (busCode: BusCodes) => void;
}

export enum BusSearchActions {
  ADD_TO_HISTORY = 'ADD_TO_HISTORY',
  RESET_SEARCH_HISTORY = 'RESET_SEARCH_HISTORY',
  CHANGE_TAB = 'CHANGE_TAB',
}


export interface IBusListAction {
  updateBusList: (list: BusList []) => void;
  updateQuery: (query: string) => void;
}

export enum BusListActions {
  UPDATE_LIST = 'UPDATE_LIST',
  UPDATE_QUERY = 'UPDATE_QUERY',
}

export interface IBusListState {
  list: BusList [];
  query: string;
  // TODO: flatten the state. IBusListState.type and IBusSearchState.activeTab is a duplicate
  type: string;
}

export interface IBusSearchModuleStateParticle extends IReduxState {
  busList: IBusListState;
  busSearch: IBusSearchState;
}

export interface IBusSearchModuleStore extends Store<IBusSearchModuleStateParticle> {}
