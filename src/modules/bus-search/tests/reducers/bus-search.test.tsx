
import { assert } from 'chai';

import { IAction } from 'src/types';
import { BusSearchActions } from 'src/modules/bus-search/types';
import { createBusSearchReducer } from 'src/modules/bus-search/store/bus-search';
import { BusCodes } from 'src/types/enums';
import { getDefaultBusSearch } from 'src/modules/bus-search/defaults';
import { BusSearchStateParticle, IBusSearchState } from 'src/modules/bus-search/types';

const busSearch = createBusSearchReducer({ historyDisplayLimit: 3 } as any);

describe('bus search reducer', () => {

  it('replaces the search history on RESET_SEARCH_HISTORY', () => {
    const
      oldState = getDefaultBusSearch(),
      action: IAction<BusSearchActions, IBusSearchState> = {
        type: BusSearchActions.RESET_SEARCH_HISTORY,
        payload: {
          activeTab: BusCodes.BUS,
          lists: {},
        }
      },
      newState = busSearch(oldState, action)
      ;

    assert.equal(newState, action.payload);
  });

  it('adds bus search to correct bin on UPDATE_QUERY', () => {
    const
      oldState = getDefaultBusSearch(),
      _busSearch: any = {},
      action: IAction<BusSearchActions, BusSearchStateParticle> = {
        type: BusSearchActions.ADD_TO_HISTORY,
        payload: { key: BusCodes.TRAM, busSearch: _busSearch }
      },
      newState = busSearch(oldState, action)
      ;

    assert.deepEqual(newState.lists[BusCodes.TRAM], [_busSearch]);
  });

  it('adds bus search to correct bin to the head of the list removing existing entry', () => {
    const
      oldState = getDefaultBusSearch(),
      _busSearch: any = { _busSearch: '_busSearch' },
      _busSearch2: any = { _busSearch2: '_busSearch2' },
      action: IAction<BusSearchActions, BusSearchStateParticle> = {
        type: BusSearchActions.ADD_TO_HISTORY,
        payload: { key: BusCodes.TRAM, busSearch: _busSearch }
      },
      action2: IAction<BusSearchActions, BusSearchStateParticle> = {
        type: BusSearchActions.ADD_TO_HISTORY,
        payload: { key: BusCodes.TRAM, busSearch: _busSearch2 }
      }
      ;
    let
      newState = busSearch(oldState, action)
      ;
    newState = busSearch(newState, action2);
    newState = busSearch(newState, action);

    assert.deepEqual(newState.lists[BusCodes.TRAM], [_busSearch, _busSearch2]);
  });

  it('removes old history from the tail if the size exceeds the limit', () => {
    const
      oldState = getDefaultBusSearch(),
      _busSearch: any = { _busSearch: '_busSearch' },
      _busSearch2: any = { _busSearch2: '_busSearch2' },
      _busSearch3: any = { _busSearch3: '_busSearch3' },
      _busSearch4: any = { _busSearch4: '_busSearch4' },
      action: IAction<BusSearchActions, BusSearchStateParticle> = {
        type: BusSearchActions.ADD_TO_HISTORY,
        payload: { key: BusCodes.TRAM, busSearch: _busSearch }
      },
      action2: IAction<BusSearchActions, BusSearchStateParticle> = {
        type: BusSearchActions.ADD_TO_HISTORY,
        payload: { key: BusCodes.TRAM, busSearch: _busSearch2 }
      },
      action3: IAction<BusSearchActions, BusSearchStateParticle> = {
        type: BusSearchActions.ADD_TO_HISTORY,
        payload: { key: BusCodes.TRAM, busSearch: _busSearch3 }
      },
      action4: IAction<BusSearchActions, BusSearchStateParticle> = {
        type: BusSearchActions.ADD_TO_HISTORY,
        payload: { key: BusCodes.TRAM, busSearch: _busSearch4 }
      }
      ;
    let
      newState = busSearch(oldState, action)
      ;
    newState = busSearch(newState, action2);
    newState = busSearch(newState, action3);
    newState = busSearch(newState, action4);

    assert.deepEqual(newState.lists[BusCodes.TRAM], [_busSearch4, _busSearch3, _busSearch2]);
  });

  it('updates active tab', () => {
    const
      oldState = getDefaultBusSearch(),
      action: IAction<BusSearchActions, BusCodes> = {
        type: BusSearchActions.CHANGE_TAB,
        payload: BusCodes.TRAM,
      },
      newState = busSearch(oldState, action)
      ;

    assert.equal(newState.activeTab, BusCodes.TRAM);
  });

});

