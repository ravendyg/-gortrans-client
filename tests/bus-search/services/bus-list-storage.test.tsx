
import * as sinon from 'sinon';
import { assert } from 'chai';
import { createBusListStorageService } from 'src/modules/bus-search/services/bus-list-storage';

const
  config: any = {
    defaultViewOptions: {
      lat: '54.908593335436926',
      lng: '83.0291748046875',
      zoom: 12,
    },
    defaultBusListSync: {
      tsp: 0,
      version: '',
      list: []
    },
    keys: {
      localViewParams: 'aaa'
    }
  },
  storage: any = {
    getItem: sinon.stub(),
    setItem: sinon.stub()
  },
  {
    getVal,
    setVal
  } = createBusListStorageService(storage, config)
  ;

describe('bus list storage service', () => {

  it('calls getItem', done => {
    getVal()
    .then(() => {
      try {
        sinon.assert.calledWith(storage.getItem, config.keys.busListSync);
        done();
      } catch (err) {
        done(err);
      }
    })
    .catch(done);
  });

  it('returns parsed string found in the storage', done => {
    const
      val = {
        tsp: 345345,
        version: 'sdfgfg',
        list: []
      }
      ;
    storage.getItem.returns(JSON.stringify(val));
    getVal()
    .then(opt => {
      try {
        assert.deepEqual(opt, val);
        done();
      } catch (err) {
        done(err);
      }
    })
    .catch(done);
  });

  it('returns default if the storage is empty', done => {
    storage.getItem.returns(null);
    getVal()
    .then(opt => {
      try {
        assert.deepEqual(opt, config.defaultBusListSync);
        done();
      } catch (err) {
        done(err);
      }
    })
    .catch(done);
  });

  it('returns default if the storage returns not an object', done => {
    storage.getItem.returns(JSON.stringify('val'));
    getVal()
    .then(opt => {
      try {
        assert.deepEqual(opt, config.defaultBusListSync);
        done();
      } catch (err) {
        done(err);
      }
    })
    .catch(done);
  });

  it('returns default if the storage is empty or contains malformed string ', done => {
    storage.getItem.returns(JSON.stringify('{"lat" :'));
    getVal()
    .then(opt => {
      try {
        assert.deepEqual(opt, config.defaultBusListSync);
        done();
      } catch (err) {
        done(err);
      }
    })
    .catch(done);
  });

  it('calls storage.setItem', () => {
    const val = {
      tsp: 234234,
      version: 'sdfsdf',
      list: []
    };
    setVal(val);
    sinon.assert.calledWith(storage.setItem, config.keys.busListSync, JSON.stringify(val));
  });

});

