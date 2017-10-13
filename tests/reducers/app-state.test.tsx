import {  } from 'mocha';
import { assert } from 'chai';

import { ControlActions } from '../../src/types/action-types';
import { IAppState } from '../../src/types/state';
import { appState } from '../../src/store/app-state';

describe('appState reducer', () => {

  it('shows search', () => {
    const
      state: IAppState = {
        showSearch: false
      },
      newState = appState(state, {
        type: ControlActions.SHOW_SEARCH,
        payload: null
      })
      ;

    assert.deepEqual(newState, { showSearch: true });
  });

  it('hides search', () => {
    const
      state: IAppState = {
        showSearch: false
      },
      newState = appState(state, {
        type: ControlActions.HIDE_SEARCH,
        payload: null
      })
      ;

    assert.deepEqual(newState, { showSearch: false });
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
      newState = appState(state, action)
      ;

      assert.deepEqual(newState, state);
  });

});
