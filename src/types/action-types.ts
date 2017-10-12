import { BusList } from './data-types';

export interface IPropsWithAction {
  actions: IActions;
}


export interface IActions {
  controlActions: IControlAction;
  leafletActions: ILeafletAction;
  busListActions: IBusListAction;
}


export enum ConnectionAction {
  CONNECTING = 'CONNECTING',
  CONNECTED = 'CONNECTED',
  ERROR = 'ERROR'
}


export interface IControlAction {
  toggleSearch: () => void;
}

export enum ControlActions {
  TOGGLE_SEARCH = 'TOGGLE_SEARCH'
}


export interface ILeafletAction {
  zoomIn: () => void;
  zoomOut: () => void;
  mooveend: (ev: L.LeafletEvent) => void;
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
  UPDATE_QUERY = 'UPDATE_QUERY'
}
