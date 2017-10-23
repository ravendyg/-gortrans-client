import { BusList, RouterState } from './data-types';
import { IStore } from './state';

export interface IPropsWithAction {
  actions: IMainAction;
}


export declare type MapRouterStateToPanelState = (store: IStore) => JSX.Element | null;


export interface IMainAction {
  controlActions: IControlAction;
  leafletActions: ILeafletAction;
}


export enum ConnectionAction {
  CONNECTING = 'CONNECTING',
  CONNECTED = 'CONNECTED',
  ERROR = 'ERROR'
}


export interface IControlAction {
  goTo: (state: RouterState) => void;
  goToRoot: () => void;
}

export enum ControlActions {
  GO_TO = 'GO_TO',
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



/** bus search */

/** /bus search */
