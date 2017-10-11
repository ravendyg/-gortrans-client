import {  } from 'mocha';
import * as sinon from 'sinon';
import { ControlActions } from '../../src/types/action-types';
import { createControlActions } from '../../src/actions/control';

const
  dispatch = sinon.stub(),
  { zoomIn, zoomOut, toggleSearch } = createControlActions(dispatch)
  ;

describe('control action', () => {

  beforeEach(() => {
    dispatch.resetHistory();
  });

  it('dispatch correct actin on zoomIn', () => {
    zoomIn();
    sinon.assert.calledWith(dispatch, sinon.match({
      type: ControlActions.ZOOM_IN,
      payload: null
    }));
  });

  it('dispatch correct actin on zoomOut', () => {
    zoomOut();
    sinon.assert.calledWith(dispatch, sinon.match({
      type: ControlActions.ZOOM_OUT,
      payload: null
    }));
  });

  it('dispatch correct actin on toggleSearch', () => {
    toggleSearch();
    sinon.assert.calledWith(dispatch, sinon.match({
      type: ControlActions.TOGGLE_SEARCH,
      payload: null
    }));
  });

});
