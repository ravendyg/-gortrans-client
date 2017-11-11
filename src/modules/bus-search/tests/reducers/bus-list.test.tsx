
import { assert } from 'chai';

import { BusListActions, IBusListState } from 'src/modules/bus-search/types';
import { createBusListReducer } from 'src/modules/bus-search/store/bus-list';
import { BusListActionType } from 'src/modules/bus-search/actions/bus-list';

describe('bus list reducer', () => {

  const
    busList = createBusListReducer(),
    oldState: IBusListState = {
      list: [],
      query: '',
    },
    list: any = [],
    query = '10'
    ;

  it('updates bus list only on UPDATE_LIST', () => {
    const
      action: BusListActionType = {
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
      action: BusListActionType = {
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
