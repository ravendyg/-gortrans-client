import * as React from 'react';
import * as sinon from 'sinon';
import {} from 'mocha';
import { assert } from 'chai';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-15';
configure({ adapter: new Adapter() });

import { MapComponent } from '../../src/components/Map/map';
import { MapWrapperComponent } from '../../src/components/MapWrapper/map-wrapper';

describe('map wrapper component', () => {

  const
    _map: any = sinon.stub().returns({
      setView: sinon.stub()
    }),
    tileLayer: any = sinon.stub().returns({
      addTo: sinon.stub()
    }),
    mapOptions: any = {},
    props: any = {
      Map: _map,
      tileLayer,
      config: {
        tileProvider: 'tileProvider',
        mapOptions
      },
      actions: {}
    },
    comp: ShallowWrapper = shallow(<MapWrapperComponent {...props} />),
    map: ShallowWrapper = comp.find(MapComponent)
    ;

  it('instantiates a leaflet map', () => {
    assert.equal(map.length, 1);
  });

  it('passes leaflet map to the Map component', () => {
    assert.equal(map.at(0).prop('Map'), _map);
  });

});
