import { BusList, BusSearch } from './data-types';
import { BusCodes } from './enums';
import { IBusSearchState } from './state';

export interface IPropsWithAction {
  actions: IActions;
}


export interface IActions {
  controlActions: IControlAction;
  leafletActions: ILeafletAction;
  busListActions: IBusListAction;
  busSearchAction: IBusSearchAction;
}


export enum ConnectionAction {
  CONNECTING = 'CONNECTING',
  CONNECTED = 'CONNECTED',
  ERROR = 'ERROR'
}


export interface IControlAction {
  goToRoot: () => void;
  showSearch: () => void;
  showSettings: () => void;
}

export enum ControlActions {
  GO_TO_ROOT = 'GO_TO_ROOT',
  SHOW_SEARCH = 'SHOW_SEARCH',
  SHOW_SETTINGS = 'SHOW_SETTINGS',
}


export interface ILeafletAction {
  zoomIn: () => void;
  zoomOut: () => void;
  moveend: (ev: L.LeafletEvent) => void;
  zoomend: (ev: L.LeafletEvent) => void;
}

export enum LeafletActions {
  ZOOM_IN = 'ZOOM_IN',
  ZOOM_OUT = 'ZOOM_OUT',
  MOVE_END = 'MOVE_END',
  ZOOM_END = 'ZOOM_END',
}


export interface IBusListAction {
  updateBusList: (list: BusList []) => void;
  updateQuery: (query: string) => void;
}

export enum BusListActions {
  UPDATE_LIST = 'UPDATE_LIST',
  UPDATE_QUERY = 'UPDATE_QUERY',
}


export interface IBusSearchAction {
  updateHistory: (key: BusCodes, busSearch: BusSearch) => void;
  updateAllHistory: (busSearch: IBusSearchState) => void;
}

export enum BusSearchActions {
  ADD_TO_HISTORY = 'ADD_TO_HISTORY',
  RESET_SEARCH_HISTORY = 'RESET_SEARCH_HISTORY,'
}
