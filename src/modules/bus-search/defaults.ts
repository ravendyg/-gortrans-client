import { IBusSearchState, IBusListState } from 'src/modules/bus-search/types';
import { BusCodes } from 'src/types/enums';

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
