import * as React from 'react';
import {} from 'mocha';
// import * as sinon from 'sinon';
import { assert } from 'chai';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-15';
configure({ adapter: new Adapter() });

import { MapWrapperComponent } from '../../src/components/map-wrapper/map-wrapper';
import { Controls } from '../../src/components/controls/controls';
import { SidePanel } from '../../src/components/side-panel';
import { storeFactory } from '../fake-store';
import { RouterState } from '../../src/types/data-types';

import { App, mapState } from '../../src/components/app';

const
  store = storeFactory(),
  mapProps: any = {},
  actions: any = {

  },
  app: ShallowWrapper = shallow(<App mapProps={mapProps} actions={actions} store={store}/>)
  ;

describe('<App>', () => {

  it('renders MapWrapper', () => {
    assert.equal(app.find(MapWrapperComponent).length, 1);
  });

  it('renders Controls and not SidePanel by default', () => {
    assert.equal(app.find(Controls).length, 1);
  });

  it('renders SidePanel and not Controls when appState.routerState === RouterState.SEARCH', () => {
    store._setState({appState: { routerState: RouterState.SEARCH } });
    const { panelContent } = mapState(store.getState());
    app.setState({ panelContent });
    assert.equal(app.find(SidePanel).length, 1);
    assert.equal(app.find(Controls).length, 0);
  });

  it('renders Controls and not SidePanel when appState.routerState === RouterState.BLANK', () => {
    store._setState({appState: { routerState: RouterState.BLANK } });
    const { panelContent } = mapState(store.getState());
    app.setState({ panelContent });
    assert.equal(app.find(SidePanel).length, 0);
    assert.equal(app.find(Controls).length, 1);
  });

  it('renders SidePanel and not Controls when appState.routerState === RouterState.SETTINGS', () => {
    store._setState({appState: { routerState: RouterState.SEARCH } });
    const { panelContent } = mapState(store.getState());
    app.setState({ panelContent });
    assert.equal(app.find(SidePanel).length, 1);
    assert.equal(app.find(Controls).length, 0);
  });

});
