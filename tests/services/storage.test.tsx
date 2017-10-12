import {  } from 'mocha';
import * as sinon from 'sinon';
import { assert } from 'chai';
import { createStorageService } from '../../src/services/storage';

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
    getDefaultViewOptions,
    watchViewOptions,
    getBusList,
    setBusList
  } = createStorageService(storage, config)
  ;

describe('storage service', () => {

  describe('getDefaultViewOptions', () => {

    it('calls getItem', () => {
      getDefaultViewOptions();
      sinon.assert.calledWith(storage.getItem, config.keys.localViewParams);
    });

    it('returns parsed string found in the storage', () => {
      const
        val = {
          lat: '10',
          lng: '11',
          zoom: 12
        }
        ;
      storage.getItem.returns(JSON.stringify(val));
      const opt = getDefaultViewOptions();
      assert.deepEqual(opt, val);
    });

    it('returns default if the storage is empty or contains malformed string ', () => {
      let opt;

      storage.getItem.returns(JSON.stringify('val'));
      opt = getDefaultViewOptions();
      assert.deepEqual(opt, config.defaultViewOptions);

      storage.getItem.returns(JSON.stringify('{"lat" :'));
      opt = getDefaultViewOptions();
      assert.deepEqual(opt, config.defaultViewOptions);

      storage.getItem.returns(null);
      opt = getDefaultViewOptions();
      assert.deepEqual(opt, config.defaultViewOptions);
    });

  });

  describe('watchViewOptions', () => {

    let
      sub: any,
      state: any = {
        mapState: {}
      }
      ;

    const store: any = {
      subscribe: sinon.stub().callsFake(cb => {
        sub = cb;
      }),
      getState: sinon.stub().returns(state)
    };

    before(() => {
      watchViewOptions(store);
    });

    it('subscribes to the store', () => {
      sinon.assert.calledOnce(store.subscribe);
    });

    it('calls store.getState inside cb', () => {
      store.getState.resetHistory();
      sub();
      sinon.assert.calledOnce(store.getState);
    });

    it('updates data in local storage if state changed', () => {
      storage.setItem.resetHistory();
      state.mapState = {a: 'a'};
      sub();
      sinon.assert.calledWith(storage.setItem, config.keys.localViewParams, JSON.stringify(state.mapState));
    });

    it('does not update data in local storage if state has not changed', () => {
      storage.setItem.resetHistory();
      sub();
      sinon.assert.notCalled(storage.setItem);
    });

  });

  describe('getBusList', () => {

    it('calls getItem', done => {
      getBusList()
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
      getBusList()
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
      getBusList()
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
      getBusList()
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
      getBusList()
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

  });

  describe('setBusList', () => {

    it('calls storage.setItem', () => {
      const val = {
        tsp: 234234,
        version: 'sdfsdf',
        list: []
      };
      setBusList(val);
      sinon.assert.calledWith(storage.setItem, config.keys.busListSync, JSON.stringify(val));
    });

  });

});
