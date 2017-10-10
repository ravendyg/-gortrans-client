import {  } from 'mocha';
import * as sinon from 'sinon';
import { assert } from 'chai';
import { createStorageService } from '../../src/services/storage';
import { IMapStateData } from '../../src/types/state';

const
  config: any = {
    defaultViewOptions: {
      lat: '54.908593335436926',
      lng: '83.0291748046875',
      zoom: 12,
    },
    keys: {
      localViewParams: 'aaa'
    }
  },
  storage: any = {
    getItem: sinon.stub(),
    setItem: sinon.stub()
  },
  {getDefaultViewOptions, setDefaultViewOptions} = createStorageService(storage, config)
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

  describe('setDefaultViewOptions', () => {

    it('calls localStorage.setItem', () => {
      storage.setItem.resetHistory();
      const
        val: IMapStateData = {
          lat: '1',
          lng: '2',
          zoom: 3
        }
        ;
      setDefaultViewOptions(val);
      sinon.assert.calledWith(storage.setItem, config.keys.localViewParams, JSON.stringify(val));
    });

  });

});
