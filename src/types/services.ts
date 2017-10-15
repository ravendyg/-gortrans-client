import { BusListSync } from './data-types';
import { IMapState, IStore, IReduxState, IBusSearchState } from './state';

export interface IStorageService {
  getDefaultViewOptions: () => IMapState;
  watchViewOptions: (store: IStore<IReduxState>) => void;

  getBusList: () => Promise<BusListSync>;
  setBusList: (info: BusListSync) => void;

  getBusSearch: () => Promise<IBusSearchState>;
  setBusSearch: (info: IBusSearchState) => void;
}
