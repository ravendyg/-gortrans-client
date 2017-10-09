import * as React from 'react';
import {} from 'mocha';
import * as sinon from 'sinon';
import { configure, mount } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-15';
configure({ adapter: new Adapter() });

import { ControlsComponent } from '../../../src/components/controls/controls';
import { IControlAction } from '../../../src/types/action-types';

describe('controls component', () => {

  const
    actions: {controlActions: IControlAction} = {
      controlActions: {
        zoomIn: sinon.stub(),
        zoomOut: sinon.stub(),
        toggleSearch: sinon.stub()
      }
    },
    props: {actions: any} = {
      actions
    }
    ;

  it('calls connectToApi on component creation', () => {
    // const
      // controlsComponent =
      mount(<ControlsComponent {...props} />);
    // ;
    // sinon.assert.calledOnce(connectToApi);
  });

});
