
import { assert } from 'chai';
import * as sinon from 'sinon';
import { createRouter } from '../../../src/services/router';
import { RouterState } from '../../../src/types/data-types';
import { IControlAction } from '../../../src/types/action-types';

const
  win: any = {
    location: {
      hash: 'qweqw'
    },
    addEventListener: sinon.stub(),
  },
  appState = {
    routerState: RouterState.BLANK,
  },
  store: any = {
    subscribe: sinon.stub(),
    getState: () => ({ appState }),
  },
  controlActions: IControlAction = {
    goTo: () => {/**/},
    goToRoot: () => {/**/},
  },
  goToSpy = sinon.spy(controlActions, 'goTo'),
  goToRootSpy = sinon.spy(controlActions, 'goToRoot'),
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
    goToSpy.reset();
    goToRootSpy.reset();
  });

  it('resets the hash on init', () => {
    assert.equal(win.location.hash, RouterState.BLANK);
  });

  it('subscribes to changes', () => {
    sinon.assert.calledWith(win.addEventListener, 'hashchange');
    sinon.assert.calledOnce(store.subscribe);
  });

  it(`displays search when hash changed manually to ${RouterState.SEARCH}`, () => {
    hashchange({newURL: `sdfsdf/${RouterState.SEARCH}`});
    sinon.assert.calledWith(goToSpy, RouterState.SEARCH);
  });

  it(`displays settings when hash changed manually to ${RouterState.SETTINGS}`, () => {
    hashchange({newURL: `sdfsdf/${RouterState.SETTINGS}`});
    sinon.assert.calledWith(goToSpy, RouterState.SETTINGS);
  });

  it(`displays blank when hash changed manually to an incorrect hash`, () => {
    hashchange({newURL: `sdfsdf/#fgdfg`});
    sinon.assert.calledOnce(goToRootSpy);
  });

  it(`displays blank when hash changed manually to ${RouterState.BLANK}`, () => {
    hashchange({newURL: `sdfsdf/${RouterState.BLANK}`});
    sinon.assert.calledOnce(goToRootSpy);
  });

  it(`displays blank when hash changed manually to ${RouterState.EMPTY}`, () => {
    hashchange({newURL: `sdfsdf/${RouterState.EMPTY}`});
    sinon.assert.calledOnce(goToRootSpy);
  });

});
