import { BusSearch } from '../../types/data-types';
import { BusCodes } from '../../types/enums';

export interface IBusSearchState {
  [key: string]: BusSearch [];
}

export interface IBusSearchAction {
  updateHistory: (key: BusCodes, busSearch: BusSearch) => void;
  updateAllHistory: (busSearch: IBusSearchState) => void;
}

export enum BusSearchActions {
  ADD_TO_HISTORY = 'ADD_TO_HISTORY',
  RESET_SEARCH_HISTORY = 'RESET_SEARCH_HISTORY,'
}