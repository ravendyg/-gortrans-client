import * as React from 'react';
import {} from 'mocha';
import { assert } from 'chai';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-15';
configure({ adapter: new Adapter() });

import { MapComponent } from '../../src/components/Map/map';
import { MapWrapperComponent, IMapProps } from '../../src/components/MapWrapper/map-wrapper';

describe('map wrapper component', () => {

  const
    _map: any = {},
    props: IMapProps = {
      Map: _map,
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
