import { Store } from 'redux';
import { BusList, BusSearch } from '../../types/data-types';
import { BusCodes } from '../../types/enums';

export interface IBusSearchState {
  [index: string/*BusCodes*/]: BusSearch [];
}

export declare type BusSearchStateParticle = { key: BusCodes, busSearch: BusSearch };

export interface IBusSearchAction {
  updateHistory: (key: BusCodes, busSearch: BusSearch) => void;
  updateAllHistory: (busSearch: IBusSearchState) => void;
}

export enum BusSearchActions {
  ADD_TO_HISTORY = 'ADD_TO_HISTORY',
  RESET_SEARCH_HISTORY = 'RESET_SEARCH_HISTORY,'
}


export interface IBusListAction {
  updateBusList: (list: BusList []) => void;
  updateQuery: (query: string) => void;
  updateType: (type: string) => void;
}

export enum BusListActions {
  UPDATE_LIST = 'UPDATE_LIST',
  UPDATE_QUERY = 'UPDATE_QUERY',
  SELECT_TYPE = 'SELECT_TYPE',
}

export interface IBusListState {
  list: BusList [];
  query: string;
  type: string;
}

export interface IBusSearchModuleStateParticle {
  busList: IBusListState;
  busSearch: IBusSearchState;
}

export interface IBusSearchModuleStore extends Store<IBusSearchModuleStateParticle> {}
