import {  } from 'mocha';
import { assert } from 'chai';

import { ConnectionAction } from '../../../src/types/action-types';
import { apiConnection } from '../../../src/store/connection';

function createDefaultState(socket?: any) {
  return { socket: socket || null, error: null };
}

describe('apiConnection reducer', () => {

  it('returns socket on CONNECTED', () => {
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

  it('returns error on ERROR', () => {
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

  it('returns null on CONNECTING', () => {
    const
      state = createDefaultState('not null'),
      newState = apiConnection(state, {
        type: ConnectionAction.CONNECTING,
        payload: null
      })
      ;

    assert.deepEqual(newState, { socket: null, error: null });
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
