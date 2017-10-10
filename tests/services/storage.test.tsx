import {  } from 'mocha';
import * as sinon from 'sinon';
import { assert } from 'chai';
import { getDefaultViewOptions } from '../../src/services/storage';

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
  }
  ;

describe('storage service', () => {

  let storage: any;

  before(() => {
    storage = {
      getItem: sinon.stub()
    };
  });

  describe('getDefaultViewOptions', () => {

    it('calls getItem', () => {
      getDefaultViewOptions(storage, config);
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
      const opt = getDefaultViewOptions(storage, config);
      assert.deepEqual(opt, val);
    });

    it('returns default if the storage is empty or contains malformed string ', () => {
      let opt;

      storage.getItem.returns(JSON.stringify('val'));
      opt = getDefaultViewOptions(storage, config);
      assert.deepEqual(opt, config.defaultViewOptions);

      storage.getItem.returns(JSON.stringify('{"lat" :'));
      opt = getDefaultViewOptions(storage, config);
      assert.deepEqual(opt, config.defaultViewOptions);

      storage.getItem.returns(null);
      opt = getDefaultViewOptions(storage, config);
      assert.deepEqual(opt, config.defaultViewOptions);
    });

  });

});
