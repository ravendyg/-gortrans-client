
import { assert } from 'chai';

import { ConnectionAction } from '../../../src/types/action-types';
import { apiConnection } from '../../../src/store/connection';

function createDefaultState(socket?: SocketIOClient.Socket) {
  return { socket: socket || null, error: null };
}

describe('apiConnection reducer', () => {

  it('returns socket on CONNECTED', () => {
    const
      state = createDefaultState(),
      socket = {} as SocketIOClient.Socket,
      newState = apiConnection(state, {
        type: ConnectionAction.CONNECTED,
        payload: socket
      })
      ;

    assert.deepEqual(newState, { socket, error: null });
  });

  it('returns error on ERROR', () => {
    const
      state = createDefaultState(),
      payload = new Error(''),
      newState = apiConnection(state, {
        type: ConnectionAction.ERROR,
        payload
      })
      ;

      assert.deepEqual(newState, { socket: null, error: payload });
  });

  it('returns null on CONNECTING', () => {
    const
      socket = {} as SocketIOClient.Socket,
      state = createDefaultState(socket),
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
      payload = {} as SocketIOClient.Socket,
      action: any = {
        type: 'type',
        payload
      },
      newState = apiConnection(state, action)
      ;

      assert.deepEqual(newState, state);
  });

});
