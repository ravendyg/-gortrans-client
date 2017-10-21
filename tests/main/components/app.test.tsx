import * as React from 'react';
import {} from 'mocha';
// import * as sinon from 'sinon';
import { assert } from 'chai';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-15';
configure({ adapter: new Adapter() });

import { MapWrapperComponent } from '../../../src/components/map-wrapper/map-wrapper';
import { Controls } from '../../../src/components/controls/controls';
import { SidePanel } from '../../../src/components/side-panel';
import { storeFactory } from '../../fake-store';
import { RouterState } from '../../../src/types/data-types';
import { App, mapState } from '../../../src/components/app';

const
  store = storeFactory(),
  mapProps: any = {},
  actions: any = {
    controlActions: {
      goToRoot: () => {/**/},
    }
  },
  _win: any = {},
  app: ShallowWrapper = shallow(
    <App
      mapProps={mapProps}
      actions={actions}
      store={store}
      win={_win}
    />
  )
  ;

describe('<App>', () => {

  it('renders MapWrapper', () => {
    assert.equal(app.find(MapWrapperComponent).length, 1);
  });

  it('renders Controls and not SidePanel by default', () => {
    assert.equal(app.find(Controls).length, 1);
  });

  it('renders SidePanel and not Controls when appState === RouterState.SEARCH', () => {
    store._setState({ appState: RouterState.SEARCH });
    const { panelContent } = mapState(store.getState(), actions);
    app.setState({ panelContent });
    assert.equal(app.find(SidePanel).length, 1);
    assert.equal(app.find(Controls).length, 0);
    const {
      closeMe, slideLength, win
    } = app.find(SidePanel).props();
    assert.equal(closeMe, actions.controlActions.goToRoot);
    assert.equal(slideLength, '0.5s');
    assert.equal(win, _win);
  });

  it('renders Controls and not SidePanel when appState === RouterState.BLANK', () => {
    store._setState({ appState: RouterState.BLANK });
    const { panelContent } = mapState(store.getState(), actions);
    app.setState({ panelContent });
    assert.equal(app.find(SidePanel).length, 0);
    assert.equal(app.find(Controls).length, 1);
  });

  it('renders SidePanel and not Controls when appState === RouterState.SETTINGS', () => {
    store._setState({ appState: RouterState.SEARCH });
    const { panelContent } = mapState(store.getState(), actions);
    app.setState({ panelContent });
    assert.equal(app.find(SidePanel).length, 1);
    assert.equal(app.find(Controls).length, 0);
  });

});
