import { IMapState, IStore, IReduxState } from './state';

export interface IStorageService<T> {
  getVal: () => Promise<T>;
  setVal: (val: T) => void;
}

export interface IViewStorageService {
  getMapViewOptions: () => IMapState;
  watchViewOptions: (store: IStore<IReduxState>) => void;
}
