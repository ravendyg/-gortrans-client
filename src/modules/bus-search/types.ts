import { Store } from 'redux';
import { BusList, BusSearch } from 'src/types/data-types';
import { BusCodes } from 'src/types/enums';
import { IReduxState } from 'src/types/state';

export interface IBusSearchState {
  lists: {
    [index: string/*BusCodes*/]: BusSearch []
  };
  activeTab: BusCodes;
}

export declare type BusSearchStateParticle = { key: BusCodes, busSearch: BusSearch };

export interface IBusSearchAction {
  updateHistory: (key: BusCodes, busSearch: BusSearch) => void;
  updateAllHistory: (busSearch: IBusSearchState) => void;
  changeTab: (busCode: BusCodes) => void;
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
  type: string;
}

export interface IBusSearchModuleStateParticle extends IReduxState {
  busList: IBusListState;
  busSearch: IBusSearchState;
}

export interface IBusSearchModuleStore extends Store<IBusSearchModuleStateParticle> {}
