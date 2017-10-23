import { IMapState, IStore } from './state';

export interface IStorageService<T> {
  getVal: () => Promise<T>;
  setVal: (val: T) => void;
}

export interface IViewStorageService {
  getMapViewOptions: () => IMapState;
  watchViewOptions: (store: IStore) => void;
}
