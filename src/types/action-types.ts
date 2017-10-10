export interface IActions {
  controlActions: IControlAction;
}

export interface IPropsWithAction {
  actions: IActions;
}


export enum ConnectionAction {
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
  zomeend: (ev: L.LeafletEvent) => void;
}

export enum LeafletListenerActions {
  MOVE_END = 7,
  ZOOM_END = 8
}
