import {  } from 'mocha';
import { assert } from 'chai';

import { ConnectionAction } from '../../src/types/action-types';
import { apiConnection } from '../../src/store/connection';

function createDefaultState() {
  return { socket: null, error: null };
}

describe('apiConnection reducer', () => {

  it('returns socket', () => {
    const
      state = createDefaultState(),
      payload: any = 'socket',
      newState = apiConnection(state, {
        type: ConnectionAction.CONNECTED,
        payload
      })
      ;

    assert.deepEqual(newState, { socket: payload, error: null });
  });

  it('returns error', () => {
    const
      state = createDefaultState(),
      payload: any = 'socket',
      newState = apiConnection(state, {
        type: ConnectionAction.ERROR,
        payload
      })
      ;

      assert.deepEqual(newState, { socket: null, error: payload });
  });

  it('ignores unknown action', () => {
    const
      state = createDefaultState(),
      payload: any = 'socket',
      action: any = {
        type: 'type',
        payload
      },
      newState = apiConnection(state, action)
      ;

      assert.deepEqual(newState, state);
  });

});
