import * as React from 'react';
import {} from 'mocha';
import * as sinon from 'sinon';
import { configure, mount } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-15';
configure({ adapter: new Adapter() });

import { MapComponent } from '../../src/components/Map/map';

describe('map component', () => {

  it('instanciates a leaflet map', () => {
    const _map: any = sinon.stub();
    mount(<MapComponent Map={_map} />);
    sinon.assert.calledOnce(_map);
  });

});
