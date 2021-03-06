import { RouterState } from 'src/types/data-types';
import { IStore } from 'src/types/state';

export interface IPropsWithAction {
  actions: IMainAction;
}


export declare type MapRouterStateToPanelState = (store: IStore) => JSX.Element | null;


export interface IMainAction {
  controlActions: IControlAction;
  leafletActions: ILeafletAction;
}


export const enum ConnectionAction {
  CONNECTING = 'CONNECTING',
  CONNECTED = 'CONNECTED',
  ERROR = 'ERROR'
}


export interface IControlAction {
  goTo: (state: RouterState) => void;
  goToRoot: () => void;
}

export const enum ControlActions {
  GO_TO = 'GO_TO',
}


export interface ILeafletAction {
  zoomIn: () => void;
  zoomOut: () => void;
  moveend: (ev: L.LeafletEvent) => void;
  zoomend: (ev: L.LeafletEvent) => void;
}

export const enum LeafletActions {
  ZOOM_IN = 'ZOOM_IN',
  ZOOM_OUT = 'ZOOM_OUT',
  MOVE_END = 'MOVE_END',
  ZOOM_END = 'ZOOM_END',
}

export interface ITranslationActions {
  setLang: (lang: string) => void;
}

export const enum TranslationActions {
  SET_LANGUAGE = 'SET_LANGUAGE',
}
