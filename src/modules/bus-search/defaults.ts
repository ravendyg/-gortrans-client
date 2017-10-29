import { IBusSearchState, IBusListState } from './types';
import { BusCodes } from '../../types/enums';

export function getDefaultBusSearch(): IBusSearchState {
  return {
    [BusCodes.BUS]: [],
    [BusCodes.TRAM]: [],
    [BusCodes.TROLLEY]: [],
    [BusCodes.SHUTTLE]: [],
  };
}

export function getDefaultSelectedTypeInList() {
  return BusCodes.BUS;
}

export function getDefaultBusList(): IBusListState {
  return {
    query: '',
    list: [],
    type: getDefaultSelectedTypeInList(),
  };
}
