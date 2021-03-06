import * as React from 'react';
import * as sinon from 'sinon';
import {} from 'mocha';
import { assert } from 'chai';
import { shallow, ShallowWrapper } from 'enzyme';

import { MapComponent } from '../../../src/components/map/map';
import { MapWrapperComponent } from '../../../src/components/map-wrapper/map-wrapper';
import { storeFactory } from '../../fake-store';

describe('<MapWrapper>', () => {

  const
    store = storeFactory(),
    mapReturn: any = {
      setView: sinon.stub(),
      removeControl: sinon.stub()
    },
    layerReturn: any = {
      addTo: sinon.stub()
    },
    tileLayer: any = sinon.stub().returns(layerReturn),
    Control: any = sinon.stub(),
    mapOptions: any = {},
    L: any = {
      Map: sinon.stub().returns(mapReturn),
      tileLayer,
      Control
    },
    zoomend = () => {/**/},
    moveend = () => {/**/},
    props: any = {
      L,
      config: {
        tileProvider: 'tileProvider',
        mapOptions
      },
      actions: {
        leafletActions: {
          moveend, zoomend
        }
      },
      store
    },
    comp: ShallowWrapper<any, any> = shallow(<MapWrapperComponent {...props} />),
    map: ShallowWrapper<any, any> = comp.find(MapComponent)
    ;

  it('instantiates a leaflet map', () => {
    assert.equal(map.length, 1);
  });

  it('passes leaflet map to the Map component', () => {
    assert.equal(map.at(0).prop('L'), L);
  });

  it('passes leaflet listeners to the Map component', () => {
    assert.deepEqual(map.at(0).prop('listeners'), { moveend, zoomend });
  });

});
