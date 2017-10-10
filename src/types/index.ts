export interface IAction<T, P> {
  type: T;
  payload: P;
}

export interface IConfig {
  apiUrl: string;
  mapOptions: {
    minZoom: number,
    maxZoom: number,
    maxBounds: L.LatLngBounds
  };
  tileProvider: string;
  defaultCoords: [number, number];
  defaultZoom: number;
}

export interface ICtor<T> {
  new(...args: any[]): T;
}
