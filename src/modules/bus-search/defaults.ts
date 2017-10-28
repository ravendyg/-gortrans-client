import { IBusSearchState } from './types';
import { BusListSync } from '../../types/data-types';

export function getDefaultBusSearch(): IBusSearchState {
  return {
    '0': [],
    '1': [],
    '2': [],
    '7': [],
  };
}

export function getDefaultBusListSync(): BusListSync {
  return {
    tsp: 0,
    version: '',
    list: []
  };
}
