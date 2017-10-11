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
    version: 0
  },
  date: any = {
    now: sinon.stub().returns(0)
  },
  storageService: any = {
    getBusListSync: sinon.stub().returns(busListSync),
    getDefaultViewOptions: sinon.stub(),
    setBusListSync: sinon.stub(),
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
    storageService.setBusListSync.resetHistory();
  });

  it('fetches last sync info', () => {
    busListProvider.subscribe(store);
    sinon.assert.calledOnce(storageService.getBusListSync);
  });

  it('calls Store.subscribe', () => {
    busListProvider.subscribe(store);
    sinon.assert.calledOnce(store.subscribe);
  });

  it('checks connection status on subscription', () => {
    busListProvider.subscribe(store);
    sinon.assert.calledOnce(store.getState);
  });

  it('checks last sync tsp if connected and does nothing if is up to date', () => {
    const connection = new EventEmitter();
    apiConnection.socket = connection;
    busListProvider.subscribe(store);
    sinon.assert.calledOnce(date.now);
  });

  it('subscribes to "syncBusListResponse" and emits "syncBusListRequest" if outdated', () => {
    const
      connection = new EventEmitter(),
      spyOn = sinon.spy(connection, 'on'),
      spyEmit = sinon.spy(connection, 'emit')
      ;

    apiConnection.socket = connection;
    date.now.returns(100);

    busListProvider.subscribe(store);
    sinon.assert.calledWith(spyOn, messages.syncBusListResponse);
    sinon.assert.calledWith(spyEmit, messages.syncBusListRequest);
  });

  it('updates bus list sync info', () => {
    const
      connection = new EventEmitter()
      ;
    apiConnection.socket = connection;
    date.now.returns(200);

    busListProvider.subscribe(store);
    connection.emit(messages.syncBusListResponse, {
      version: 0, list: []
    });

    sinon.assert.calledWith(storageService.setBusListSync, sinon.match({
      version: 0, tsp: 200
    }));
    sinon.assert.notCalled(busListActions.updateBusList);
  });

  it('updates bus list if response version is greater', () => {
    const
      connection = new EventEmitter(),
      list: any [] = []
      ;
    apiConnection.socket = connection;
    date.now.returns(300);

    busListProvider.subscribe(store);
    connection.emit(messages.syncBusListResponse, {
      version: 1, list
    });

    sinon.assert.calledWith(storageService.setBusListSync, sinon.match({
      version: 1, tsp: 300
    }));
    sinon.assert.calledWith(busListActions.updateBusList, list);
  });

});
