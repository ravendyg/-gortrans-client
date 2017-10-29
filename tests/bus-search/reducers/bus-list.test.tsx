
import { assert } from 'chai';

import { BusListActions, IBusListState } from '../../../src/modules/bus-search/types';
import { IAction } from '../../../src/types';
import { createBusListReducer } from '../../../src/modules/bus-search/store/bus-list';

describe('bus list reducer', () => {

  const
    busList = createBusListReducer(),
    oldState: IBusListState = {
      list: [],
      query: '',
      type: '0',
    },
    list: any = [],
    query = '10',
    type = '7'
    ;

  it('updates bus list only on UPDATE_LIST', () => {
    const
      action: IAction<BusListActions, IBusListState> = {
        type: BusListActions.UPDATE_LIST,
        payload: { list, query, type }
      },
      newState = busList(oldState, action)
      ;

    assert.equal(newState.list, list);
    assert.equal(newState.query, oldState.query);
    assert.equal(newState.type, oldState.type);
  });

  it('updates query only on UPDATE_QUERY', () => {
    const
      action: IAction<BusListActions, IBusListState> = {
        type: BusListActions.UPDATE_QUERY,
        payload: { list, query, type }
      },
      newState = busList(oldState, action)
      ;

    assert.equal(newState.list, oldState.list);
    assert.equal(newState.query, query);
    assert.equal(newState.type, oldState.type);
  });

  it('updates type only on SELECT_TYPE', () => {
    const
      action: IAction<BusListActions, IBusListState> = {
        type: BusListActions.SELECT_TYPE,
        payload: { list, query, type }
      },
      newState = busList(oldState, action)
      ;

    assert.equal(newState.list, oldState.list);
    assert.equal(newState.query, oldState.query);
    assert.equal(newState.type, type);
  });

  it('ignores incorrect type', () => {
    const
      action: IAction<BusListActions, IBusListState> = {
        type: 'BusListActions.UPDATE_LIST' as any,
        payload: { list, query, type: '15' }
      },
      newState = busList(oldState, action)
      ;

    assert.equal(newState.list, oldState.list);
    assert.equal(newState.query, oldState.query);
    assert.equal(newState.type, oldState.type);
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
