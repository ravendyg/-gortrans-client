export declare type Way = {
  marsh: string,
  name: string,
  stopb: string,
  stope: string
};

export declare type BusList = {
  type: string,
  ways: Way []
};

export declare type BusListSync = {
  tsp: number;
  version: string;
  list: BusList []
};

export declare type BusListSyncResponse = {
  tsp: number,
  version?: string;
  list?: BusList []
};

export enum RouterState {
  BLANK = '',
  EMPTY = '#',
  SEARCH = '#search',
  SETTINGS = '#settings',
}

export declare type BusSearch = {
  title: string;
  marsh: string;
};

