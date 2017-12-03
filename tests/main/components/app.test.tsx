import * as React from 'react';
import {} from 'mocha';
import { assert } from 'chai';
import { shallow, ShallowWrapper } from 'enzyme';

import { MapWrapperComponent } from '../../../src/components/map-wrapper/map-wrapper';
import { Controls } from '../../../src/components/controls/controls';
import { SidePanel } from '../../../src/components/side-panel';
import { storeFactory } from '../../fake-store';
import { AppUnconnected, IAppProps } from '../../../src/components/app';

const
  store = storeFactory(),
  mapProps: any = {},
  content = <div data-test-id="content"></div>,
  actions: any = {
    controlActions: {
      goToRoot: () => {/**/},
    },
  },
  _win: any = {},
  props: IAppProps = {
    mapProps,
    actions,
    store,
    win: _win,
    panelContent: null,
  },
  app: ShallowWrapper = shallow(
    <AppUnconnected {...props} />
  )
  ;

describe('<App>', () => {

  it('renders MapWrapper', () => {
    assert.equal(app.find(MapWrapperComponent).length, 1);
  });

  it('renders Controls and not SidePanel by default', () => {
    assert.equal(app.find(Controls).length, 1);
  });

  it('renders Controls and not SidePanel when panelContent', () => {
    assert.equal(app.find(SidePanel).length, 0);
    assert.equal(app.find(Controls).length, 1);
  });

  it('renders SidePanel and not Controls when panelContent is not null', () => {
    app.setProps({ panelContent: content });
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
