import {  } from 'mocha';
import { assert } from 'chai';

import { BusListActions } from '../../../src/modules/bus-search/types';
import { createBusListReducer } from '../../../src/modules/bus-search/store/bus-list';

describe('bus list reducer', () => {

  const
  busList = createBusListReducer(),
    oldState: any = {
      list: [],
      query: ''
    },
    list: any = {},
    query = '10'
    ;

  it('updates bus list only on UPDATE_LIST', () => {
    const
      action: any = {
        type: BusListActions.UPDATE_LIST,
        payload: { list, query }
      },
      newState = busList(oldState, action)
      ;

    assert.equal(newState.list, list);
    assert.equal(newState.query, oldState.query);
  });

  it('updates query only on UPDATE_QUERY', () => {
    const
      action: any = {
        type: BusListActions.UPDATE_QUERY,
        payload: { list, query }
      },
      newState = busList(oldState, action)
      ;

    assert.equal(newState.list, oldState.list);
    assert.equal(newState.query, query);
  });

  it('ignores other actions', () => {
    const
      action: any = {
        type: ('as' as any),
        payload: { list, query }
      },
      newState = busList(oldState, action)
      ;

    assert.equal(newState, oldState);
  });

});
