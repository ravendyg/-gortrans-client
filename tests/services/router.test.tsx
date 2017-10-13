import {  } from 'mocha';
import { assert } from 'chai';
import * as sinon from 'sinon';
import { createRouter, searchHash } from '../../src/services/router';

const
  win: any = {
    location: {
      hash: 'qweqw'
    },
    addEventListener: sinon.stub()
  },
  appState = {
    showSearch: false
  },
  store: any = {
    subscribe: sinon.stub(),
    getState: () => ({ appState }),
  },
  controlActions: any = {
    showSearch: sinon.stub(),
    hideSearch: sinon.stub(),
  },
  initRouter = createRouter(win, store, controlActions)
  ;

describe('router service', () => {

  let
    hashchange: (ev: any) => void,
    dispatch: () => void
    ;

  before(() => {
    initRouter();
    hashchange = win.addEventListener.getCall(0).args[1];
    dispatch = store.subscribe.getCall(0).args[0];
  });

  beforeEach(() => {
    controlActions.showSearch.resetHistory();
    controlActions.hideSearch.resetHistory();
  });

  it('resets the hash on init', () => {
    assert.equal(win.location.hash, '');
  });

  it('subscribes to changes', () => {
    sinon.assert.calledWith(win.addEventListener, 'hashchange');
    sinon.assert.calledOnce(store.subscribe);
  });

  it('displays search when hash changed manually to a correct value', () => {
    hashchange({newURL: `sdfsdf/${searchHash}`});
    sinon.assert.calledOnce(controlActions.showSearch);
  });

  it(`hides search when hash changed manually to some value different from "${searchHash}"`, () => {
    hashchange({newURL: 'sdfsdf/#'});
    sinon.assert.calledOnce(controlActions.hideSearch);
  });

  it(`changes hash to "${searchHash}" when appState.showSearch === true and location !== ${searchHash}`, () => {
    win.location.hash = '';
    appState.showSearch = true;
    dispatch();
    assert.equal(win.location.hash, searchHash);
  });

  it(`empties hash when appState.showSearch === false and location === ${searchHash}`, () => {
    win.location.hash = searchHash;
    appState.showSearch = false;
    dispatch();
    assert.equal(win.location.hash, '');
  });

  it(`does not changes hash when appState.showSearch === true and location === ${searchHash}`, () => {
    win.location.hash = searchHash;
    appState.showSearch = true;
    dispatch();
    assert.equal(win.location.hash, searchHash);
  });

});
