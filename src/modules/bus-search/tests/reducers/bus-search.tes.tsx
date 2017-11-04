
import { assert } from 'chai';

import { BusSearchActions } from 'src/modules/bus-search/types';
import { createBusSearchReducer } from 'src/modules/bus-search/store/bus-search';
import { BusCodes } from 'src/types/enums';

const busSearch = createBusSearchReducer({ historyDisplayLimit: 3 } as any);

describe('bus search reducer', () => {

  it('replaces the search history on RESET_SEARCH_HISTORY', () => {
    const
      oldState: any = {},
      action: any = {
        type: BusSearchActions.RESET_SEARCH_HISTORY,
        payload: {}
      },
      newState = busSearch(oldState, action)
      ;

    assert.equal(newState, action.payload);
  });

  it('adds bus search to correct bin on UPDATE_QUERY', () => {
    const
      oldState: any = {},
      _busSearch: any = {},
      action: any = {
        type: BusSearchActions.ADD_TO_HISTORY,
        payload: { key: BusCodes.TRAM, busSearch: _busSearch }
      },
      newState = busSearch(oldState, action)
      ;

    assert.deepEqual(newState[BusCodes.TRAM], [_busSearch]);
  });

  it('adds bus search to correct bin to the head of the list removing existing entry', () => {
    const
      oldState: any = {},
      _busSearch: any = { _busSearch: '_busSearch' },
      _busSearch2: any = { _busSearch2: '_busSearch2' },
      action: any = {
        type: BusSearchActions.ADD_TO_HISTORY,
        payload: { key: BusCodes.TRAM, busSearch: _busSearch }
      },
      action2: any = {
        type: BusSearchActions.ADD_TO_HISTORY,
        payload: { key: BusCodes.TRAM, busSearch: _busSearch2 }
      }
      ;
    let
      newState = busSearch(oldState, action)
      ;
    newState = busSearch(newState, action2);
    newState = busSearch(newState, action);

    assert.deepEqual(newState[BusCodes.TRAM], [_busSearch, _busSearch2]);
  });

  it('removes old history from the tail if the size exceeds the limit', () => {
    const
      oldState: any = {},
      _busSearch: any = { _busSearch: '_busSearch' },
      _busSearch2: any = { _busSearch2: '_busSearch2' },
      _busSearch3: any = { _busSearch3: '_busSearch3' },
      _busSearch4: any = { _busSearch4: '_busSearch4' },
      action: any = {
        type: BusSearchActions.ADD_TO_HISTORY,
        payload: { key: BusCodes.TRAM, busSearch: _busSearch }
      },
      action2: any = {
        type: BusSearchActions.ADD_TO_HISTORY,
        payload: { key: BusCodes.TRAM, busSearch: _busSearch2 }
      },
      action3: any = {
        type: BusSearchActions.ADD_TO_HISTORY,
        payload: { key: BusCodes.TRAM, busSearch: _busSearch3 }
      },
      action4: any = {
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

    assert.deepEqual(newState[BusCodes.TRAM], [_busSearch4, _busSearch3, _busSearch2]);
  });

});

