import {  } from 'mocha';
import * as sinon from 'sinon';

import { storeFactory } from '../../fake-store';
import { createBusSearchProvider } from '../../../src/modules/bus-search/providers/bus-search';
import { IBusSearchState } from '../../../src/types/state';
import { BusCodes } from '../../../src/types/enums';

const
  busSearch: IBusSearchState = {
    [BusCodes.BUS]: [],
    [BusCodes.SHUTTLE]: [],
  },
  store = storeFactory({ busSearch } as any),
  storageService: any = {
    getVal: sinon.stub().returns(Promise.resolve(busSearch)),
    setVal: sinon.stub(),
  },
  busSearchActions: any = {
    updateHistory: sinon.stub(),
    updateAllHistory: sinon.stub(),
  },
  busSearchProvider = createBusSearchProvider(busSearchActions, storageService)
  ;

describe('bus list provider', () => {

  beforeEach(() => {
    store._resetAllHistory();
  });

  it('fetches last search history', done => {
    busSearchProvider.subscribe(store)
    .then(() => {
      sinon.assert.calledOnce(storageService.getVal);
      done();
    })
    .catch(done);
  });

  it('calls Store.subscribe', done => {
    busSearchProvider.subscribe(store)
    .then(() => {
      sinon.assert.calledOnce(store.subscribe);
      done();
    })
    .catch(done);
  });

  it('checks whether search history is up to date', done => {
    busSearchProvider.subscribe(store)
    .then(() => {
      sinon.assert.calledOnce(store.getState);
      done();
    })
    .catch(done);
  });

});
