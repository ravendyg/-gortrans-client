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
  version: number;
};

export declare type BusListSyncResponse = {
  version: number;
  list: BusList []
};
