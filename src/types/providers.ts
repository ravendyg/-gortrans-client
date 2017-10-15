import { IStore, IReduxState } from '../types/state';

export interface IProvider {
  subscribe: (store: IStore<IReduxState>) => Promise<void>;
}

