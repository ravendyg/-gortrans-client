import { ListMarsh } from './data-types';

export interface IPropsWithAction {
  actions: IActions;
}


export interface IActions {
  controlActions: IControlAction;
  leafletListenerActions: ILeafletListenerAction;
}


export enum ConnectionAction {
  CONNECTING = 1,
  CONNECTED = 2,
  ERROR = 3
}


export interface IControlAction {
  zoomIn: () => void;
  zoomOut: () => void;
  toggleSearch: () => void;
}

export enum ControlActions {
  ZOOM_IN = 4,
  ZOOM_OUT = 5,
  TOGGLE_SEARCH = 6
}


export interface ILeafletListenerAction {
  moveend: (ev: L.LeafletEvent) => void;
  zoomend: (ev: L.LeafletEvent) => void;
}

export enum LeafletListenerActions {
  MOVE_END = 7,
  ZOOM_END = 8
}


export interface IBusListAction {
  updateBusList: (list: ListMarsh) => void;
  updateQuery: (query: string) => void;
}

export enum BusListActions {
  UPDATE_LIST = 9,
  UPDATE_QUERY = 10
}
