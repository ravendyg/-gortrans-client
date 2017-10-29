import { IStore } from 'src/types/state';

export interface IProvider {
  subscribe: (store: IStore) => Promise<void>;
}

