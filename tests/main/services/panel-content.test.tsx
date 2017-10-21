import {  } from 'mocha';
import { assert } from 'chai';
import { mapRouterStateToPanelState } from '../../../src/services/panel-content';
import { RouterState } from '../../../src/types/data-types';
import { Search } from '../../../src/modules/bus-search/components/search';
import { Settings } from '../../../src/components/settings/settings';

describe('panel content mapper', () => {

  it('return Search', () => {
    const
      store: any = {},
      content = mapRouterStateToPanelState(RouterState.SEARCH, store)
      ;

    assert.isNotNull(content);
    assert.equal((content as JSX.Element).type, Search);
  });

  it('return Settings', () => {
    const
      content = mapRouterStateToPanelState(RouterState.SETTINGS)
      ;

    assert.isNotNull(content);
    assert.equal((content as JSX.Element).type, Settings);
  });

  it('return null in othe cases', () => {
    const
      content = mapRouterStateToPanelState('asas' as any)
      ;

    assert.isNull(content);
  });

});
