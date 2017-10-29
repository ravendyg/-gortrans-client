
import { assert } from 'chai';

import { ControlActions } from '../../../src/types/action-types';
import { appState } from '../../../src/store/app-state';
import { RouterState } from '../../../src/types/data-types';

describe('appState reducer', () => {

  it('sets a correct state', () => {
    const
      state = RouterState.BLANK,
      newState = appState(state, {
        type: ControlActions.GO_TO,
        payload: RouterState.SEARCH
      })
      ;

    assert.equal(newState, RouterState.SEARCH);
  });

  it('ignores unknown action', () => {
    const
      state = RouterState.BLANK,
      action: any = {
        type: 'type',
        payload: {}
      },
      newState = appState(state, action)
      ;

      assert.deepEqual(newState, state);
  });

});
