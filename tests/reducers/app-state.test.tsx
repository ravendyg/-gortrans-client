import {  } from 'mocha';
import { assert } from 'chai';

import { ControlActions } from '../../src/types/action-types';
import { IAppState } from '../../src/types/state';
import { mapState } from '../../src/store/app-state';

describe('mapState reducer', () => {

  it('toggles search displayed', () => {
    const
      state: IAppState = {
        showSearch: false
      },
      newState = mapState(state, {
        type: ControlActions.TOGGLE_SEARCH,
        payload: null
      })
      ;

    assert.deepEqual(newState, { showSearch: true });
  });

  it('ignores unknown action', () => {
    const
      state: IAppState = {
        showSearch: false
      },
      action: any = {
        type: 'type',
        payload: {}
      },
      newState = mapState(state, action)
      ;

      assert.deepEqual(newState, state);
  });

});
