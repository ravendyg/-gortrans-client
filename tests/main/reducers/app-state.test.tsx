import {  } from 'mocha';
import { assert } from 'chai';

import { ControlActions } from '../../../src/types/action-types';
import { IAppState } from '../../../src/types/state';
import { appState } from '../../../src/store/app-state';
import { RouterState } from '../../../src/types/data-types';

describe('appState reducer', () => {

  it('shows search', () => {
    const
      state: IAppState = {
        routerState: RouterState.BLANK
      },
      newState = appState(state, {
        type: ControlActions.SHOW_SEARCH,
        payload: null
      })
      ;

    assert.deepEqual(newState, { routerState: RouterState.SEARCH });
  });

  it('hides search', () => {
    const
      state: IAppState = {
        routerState: RouterState.BLANK
      },
      newState = appState(state, {
        type: ControlActions.GO_TO_ROOT,
        payload: null
      })
      ;

    assert.deepEqual(newState, { routerState: RouterState.BLANK });
  });

  it('ignores unknown action', () => {
    const
      state: IAppState = {
        routerState: RouterState.BLANK
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
