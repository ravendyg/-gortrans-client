import {  } from 'mocha';
import * as sinon from 'sinon';

import { ControlActions } from '../../../src/types/action-types';
import { createControlActions } from '../../../src/actions/control';
import { RouterState } from '../../../src/types/data-types';

const
  dispatch: any = sinon.stub(),
  controlActions = createControlActions(dispatch)
  ;

describe('control action', () => {

  beforeEach(() => {
    dispatch.resetHistory();
  });

  it('dispatch correct action on goTo', () => {
    controlActions.goTo(RouterState.SEARCH);
    sinon.assert.calledWith(dispatch, sinon.match({
      type: ControlActions.GO_TO,
      payload: RouterState.SEARCH
    }));
  });

  it('dispatch correct action on goToRoot', () => {
    controlActions.goToRoot();
    sinon.assert.calledWith(dispatch, sinon.match({
      type: ControlActions.GO_TO,
      payload: RouterState.BLANK
    }));
  });

});
