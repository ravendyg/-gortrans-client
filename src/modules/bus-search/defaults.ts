import { IBusSearchState, IBusListState } from './types';

export function getDefaultBusSearch(): IBusSearchState {
  return {
    '0': [],
    '1': [],
    '2': [],
    '7': [],
  };
}

export function getDefaultSelectedTypeInList() {
  return '0';
}

export function getDefaultBusList(): IBusListState {
  return {
    query: '',
    list: [],
    type: getDefaultSelectedTypeInList(),
  };
}
