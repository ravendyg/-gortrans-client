import {  } from 'mocha';
import * as sinon from 'sinon';

import { ControlActions } from '../../src/types/action-types';
import { createControlActions } from '../../src/actions/control';

const
  dispatch: any = sinon.stub(),
  { toggleSearch } = createControlActions(dispatch)
  ;

describe('control action', () => {

  beforeEach(() => {
    dispatch.resetHistory();
  });

  it('dispatch correct action on toggleSearch', () => {
    toggleSearch();
    sinon.assert.calledWith(dispatch, sinon.match({
      type: ControlActions.TOGGLE_SEARCH,
      payload: null
    }));
  });

});
