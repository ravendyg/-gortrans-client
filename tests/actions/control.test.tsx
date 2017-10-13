import {  } from 'mocha';
import * as sinon from 'sinon';

import { ControlActions } from '../../src/types/action-types';
import { createControlActions } from '../../src/actions/control';

const
  dispatch: any = sinon.stub(),
  controlActions = createControlActions(dispatch)
  ;

describe('control action', () => {

  beforeEach(() => {
    dispatch.resetHistory();
  });

  it('dispatch correct action on showSearch', () => {
    controlActions.showSearch();
    sinon.assert.calledWith(dispatch, sinon.match({
      type: ControlActions.SHOW_SEARCH,
      payload: null
    }));
  });

  it('dispatch correct action on hideSearch', () => {
    controlActions.hideSearch();
    sinon.assert.calledWith(dispatch, sinon.match({
      type: ControlActions.HIDE_SEARCH,
      payload: null
    }));
  });

});
