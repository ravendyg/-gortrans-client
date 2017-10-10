import * as React from 'react';
import * as sinon from 'sinon';
import {} from 'mocha';
import { assert } from 'chai';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-15';
configure({ adapter: new Adapter() });

import { MapComponent } from '../../src/components/map/map';
import { MapWrapperComponent } from '../../src/components/map-wrapper/map-wrapper';
import { store } from '../fake-store';

describe('map wrapper component', () => {

  const
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
    props: any = {
      L,
      config: {
        tileProvider: 'tileProvider',
        mapOptions
      },
      actions: {
        leafletListenerActions: {
          zoomend: () => {/**/}
        }
      },
      store
    },
    comp: ShallowWrapper = shallow(<MapWrapperComponent {...props} />),
    map: ShallowWrapper = comp.find(MapComponent)
    ;

  it('instantiates a leaflet map', () => {
    assert.equal(map.length, 1);
  });

  it('passes leaflet map to the Map component', () => {
    assert.equal(map.at(0).prop('L'), L);
  });

  it('passes leaflet listeners to the Map component', () => {
    assert.equal(map.at(0).prop('listeners'), props.actions.leafletListenerActions);
  });

});
