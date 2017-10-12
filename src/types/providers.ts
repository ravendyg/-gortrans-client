import { IStore, IReduxState } from '../types/state';

export interface IBusListProvider {
  subscribe: (store: IStore<IReduxState>) => Promise<void>;
}
