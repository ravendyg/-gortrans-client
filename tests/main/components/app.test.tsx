import * as React from 'react';
import {} from 'mocha';
import * as sinon from 'sinon';
import { assert } from 'chai';
import { shallow, ShallowWrapper } from 'enzyme';

import { MapWrapperComponent } from '../../../src/components/map-wrapper/map-wrapper';
import { Controls } from '../../../src/components/controls/controls';
import { SidePanel } from '../../../src/components/side-panel';
import { storeFactory } from '../../fake-store';
import { RouterState } from '../../../src/types/data-types';
import { App } from '../../../src/components/app';

const
  store = storeFactory(),
  mapProps: any = {},
  content = <div data-test-id="content"></div>,
  actions: any = {
    controlActions: {
      goToRoot: () => {/**/},
    },
  },
  mapRouterStateToPanelState = sinon.stub().returns(null),
  _win: any = {},
  props = {
    mapProps,
    actions,
    store,
    win: _win,
    mapRouterStateToPanelState,
  },
  app: ShallowWrapper = shallow(
    <App {...props} />
  )
  ;

describe('<App>', () => {

  it('renders MapWrapper', () => {
    assert.equal(app.find(MapWrapperComponent).length, 1);
  });

  it('renders Controls and not SidePanel by default', () => {
    assert.equal(app.find(Controls).length, 1);
  });

  it('renders Controls and not SidePanel when appState === RouterState.BLANK', () => {
    store._setState({ appState: RouterState.BLANK });
    assert.equal(app.find(SidePanel).length, 0);
    assert.equal(app.find(Controls).length, 1);
  });

  it('renders SidePanel and not Controls when appState !== RouterState.SEARCH', () => {
    store._setState({ appState: RouterState.SEARCH });
    app.setState({ panelContent: content });
    assert.equal(app.find(SidePanel).length, 1);
    assert.equal(app.find('[data-test-id="content"]').length, 1);
    assert.equal(app.find(Controls).length, 0);
    const {
      closeMe, slideLength, win
    } = app.find(SidePanel).props();
    assert.equal(closeMe, actions.controlActions.goToRoot);
    assert.equal(slideLength, '0.5s');
    assert.equal(win, _win);
  });

});
