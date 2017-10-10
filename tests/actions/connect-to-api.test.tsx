import {  } from 'mocha';
import * as sinon from 'sinon';
// import { assert } from 'chai';
import { ConnectionAction } from '../../src/types/action-types';
import { EventEmitter } from 'events';

import { messages } from '../../src/messages';
import { createConnectToApi } from '../../src/actions/create-connect-to-api';

const
  socket: any = new EventEmitter(),
  onSpy = sinon.spy(socket, 'on'),
  dispatch: any = sinon.stub(),
  apiKey = 'apiKey',
  storage: any = {
    getItem: sinon.stub().returns(apiKey),
    setItem: sinon.stub()
  },
  io: any = {
    connect: sinon.stub().returns(socket)
  },
  config: any = {
    apiUrl: 'apiUrl'
  },
  connectToApi = createConnectToApi(dispatch, storage, io, config)
  ;

connectToApi();

describe('api connectin actions', () => {

  it('connects to the server', () => {
    sinon.assert.calledWith(io.connect, config.apiUrl, sinon.match({ query: { apiKey } }));
  });

  it('adds listeners on socket', () => {
    sinon.assert.calledWith(onSpy, 'connect');
    sinon.assert.calledWith(onSpy, messages.newApiKey);
    sinon.assert.calledWith(onSpy, 'error');
    sinon.assert.calledWith(onSpy, 'disconnect');
  });

  it('dispatches CONNECTED on connection', () => {
    dispatch.resetHistory();
    socket.emit('connect');
    sinon.assert.calledWith(dispatch, sinon.match({
      type: ConnectionAction.CONNECTED,
      payload: socket
    }));
  });

  it('dispatches CONNECTING on disconnect', () => {
    dispatch.resetHistory();
    socket.emit('disconnect');
    sinon.assert.calledWith(dispatch, sinon.match({
      type: ConnectionAction.CONNECTING,
      payload: null
    }));
  });

  it('dispatches ERROR on error', () => {
    dispatch.resetHistory();
    const err = {};
    socket.emit('error', err);
    sinon.assert.calledWith(dispatch, sinon.match({
      type: ConnectionAction.ERROR,
      payload: err
    }));
  });

});
