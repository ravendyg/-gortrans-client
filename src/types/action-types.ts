import { BusList } from './data-types';

export interface IPropsWithAction {
  actions: IActions;
}


export interface IActions {
  controlActions: IControlAction;
  leafletListenerActions: ILeafletListenerAction;
  busListActions: IBusListAction;
}


export enum ConnectionAction {
  CONNECTING = 'CONNECTING',
  CONNECTED = 'CONNECTED',
  ERROR = 'ERROR'
}


export interface IControlAction {
  zoomIn: () => void;
  zoomOut: () => void;
  toggleSearch: () => void;
}

export enum ControlActions {
  ZOOM_IN = 'ZOOM_IN',
  ZOOM_OUT = 'ZOOM_OUT',
  TOGGLE_SEARCH = 'TOGGLE_SEARCH'
}


export interface ILeafletListenerAction {
  moveend: (ev: L.LeafletEvent) => void;
  zoomend: (ev: L.LeafletEvent) => void;
}

export enum LeafletListenerActions {
  MOVE_END = 'MOVE_END',
  ZOOM_END = 'ZOOM_END'
}


export interface IBusListAction {
  updateBusList: (list: BusList []) => void;
  updateQuery: (query: string) => void;
}

export enum BusListActions {
  UPDATE_LIST = 'UPDATE_LIST',
  UPDATE_QUERY = 'UPDATE_QUERY'
}
