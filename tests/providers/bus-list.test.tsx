import {  } from 'mocha';
import * as sinon from 'sinon';
import { EventEmitter } from 'events';

import { BusListSync } from '../../src/types/data-types';
import { storeFactory } from '../fake-store';
import { createBusListProvider } from '../../src/providers/bus-list';
import { messages } from '../../src/messages';

const
  apiConnection: any = {
    socket: null,
    error: null
  },
  store = storeFactory({ apiConnection } as any),
  config: any = {
    syncPeriod: 10
  },
  busListSync: BusListSync = {
    tsp: 0,
    version: '',
    list: [{
      type: 'type',
      ways: [{
        marsh: 'marsh',
        name: 'name',
        stopb: 'stopb',
        stope: 'stope'
      }]
    }]
  },
  date: any = {
    now: sinon.stub().returns(0)
  },
  storageService: any = {
    getBusList: sinon.stub().returns(Promise.resolve(busListSync)),
    getDefaultViewOptions: sinon.stub(),
    setBusList: sinon.stub(),
    watchViewOptions: sinon.stub()
  },
  busListActions: any = {
    updateBusList: sinon.stub()
  },
  busListProvider = createBusListProvider(busListActions, storageService, config, date)
  ;

describe('bus list provider', () => {

  beforeEach(() => {
    store._resetAllHistory();
    date.now.resetHistory();
    busListActions.updateBusList.resetHistory();
    storageService.setBusList.resetHistory();
  });

  it('fetches last sync info', done => {
    busListProvider.subscribe(store)
    .then(() => {
      sinon.assert.calledOnce(storageService.getBusList);
      done();
    })
    .catch(done);
  });

  it('calls Store.subscribe', done => {
    busListProvider.subscribe(store)
    .then(() => {
      sinon.assert.calledOnce(store.subscribe);
      done();
    })
    .catch(done);
  });

  it('checks connection status on subscription', done => {
    busListProvider.subscribe(store)
    .then(() => {
      sinon.assert.calledOnce(store.getState);
      done();
    })
    .catch(done);
  });

  it('checks last sync tsp if connected and does nothing if is up to date', done => {
    const connection = new EventEmitter();
    apiConnection.socket = connection;
    busListProvider.subscribe(store)
    .then(() => {
      sinon.assert.calledOnce(date.now);
      done();
    })
    .catch(done);
  });

  it('subscribes to "syncBusListResponse" and emits "syncBusListRequest" if outdated', done => {
    const
      connection = new EventEmitter(),
      spyOn = sinon.spy(connection, 'on'),
      spyEmit = sinon.spy(connection, 'emit')
      ;

    apiConnection.socket = connection;
    date.now.returns(100);

    busListProvider.subscribe(store)
    .then(() => {
      sinon.assert.calledWith(spyOn, messages.syncBusListResponse);
      sinon.assert.calledWith(spyEmit, messages.syncBusListRequest);
      done();
    })
    .catch(done);
  });

  it('updates bus list sync info', done => {
    const
      connection = new EventEmitter(),
      newData = {
        tsp: 123, version: 'v', list: []
      }
      ;
    apiConnection.socket = connection;
    date.now.returns(200);

    busListProvider.subscribe(store)
    .then(() => {
      setTimeout(() => {
        connection.emit(messages.syncBusListResponse, newData);

        sinon.assert.calledWith(storageService.setBusList, sinon.match(newData));
        sinon.assert.calledWith(busListActions.updateBusList, sinon.match([]));
        done();
      }, 5);
    })
    .catch(done);
  });

  it('updates ony tsp and does not dispatch', done => {
    const
      connection = new EventEmitter(),
      newData = {
        tsp: 123
      }
      ;
    apiConnection.socket = connection;
    date.now.returns(200);

    busListProvider.subscribe(store)
    .then(() => {
      setTimeout(() => {
        connection.emit(messages.syncBusListResponse, newData);

              sinon.assert.calledWith(storageService.setBusList, sinon.match(
                Object.assign({}, busListSync, newData)
              ));
              sinon.assert.notCalled(busListActions.updateBusList);
        done();
      }, 5);
    })
    .catch(done);
  });

});
