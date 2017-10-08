import * as React from 'react';
import {} from 'mocha';
import * as sinon from 'sinon';
import { configure, mount } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-15';
configure({ adapter: new Adapter() });

import { createControlsComponent } from '../../src/components/Controls/create-controls';

const
  connectToApi = sinon.stub()
  ;

describe('controls component', () => {

  it('calls connectToApi on component creation', () => {
    const
      ControlsComponent = createControlsComponent(connectToApi)
      ;
    mount(<ControlsComponent />);
    sinon.assert.calledOnce(connectToApi);
  });

});
