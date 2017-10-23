import { IStore } from '../types/state';

export interface IProvider {
  subscribe: (store: IStore) => Promise<void>;
}

