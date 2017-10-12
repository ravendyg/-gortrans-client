import { BusListSync } from './data-types';
import { IMapState, IStore, IReduxState } from './state';

export interface IStorageService {
  getDefaultViewOptions: () => IMapState;
  watchViewOptions: (store: IStore<IReduxState>) => void;

  getBusList: () => Promise<BusListSync>;
  setBusList: (info: BusListSync) => void;
}
