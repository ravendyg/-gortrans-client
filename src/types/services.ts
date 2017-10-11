import { BusListSync } from './data-types';
import { IMapState, IStore, IReduxState } from './state';

export interface IStorageService {
  getDefaultViewOptions: () => IMapState;
  watchViewOptions: (store: IStore<IReduxState>) => void;

  getBusListSync: () => BusListSync;
  setBusListSync: (info: BusListSync) => void;
}
