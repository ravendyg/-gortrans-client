import * as React from 'react';
import {} from 'mocha';
import * as sinon from 'sinon';
import { configure, mount } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-15';
configure({ adapter: new Adapter() });

import { MapComponent } from '../../src/components/map/map';

describe('map component', () => {

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
    coords: [number, number] = [1, 2],
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
      coords,
      zoom: 15
    }
    ;

  mount(<MapComponent {...props} />);

  it('instantiates a leaflet map', () => {
    sinon.assert.calledOnce(props.L.Map);
    sinon.assert.calledWith(props.L.Map, 'mapid', sinon.match({zoomControl: false}));
    sinon.assert.calledWith(mapReturn.setView, sinon.match(coords), props.zoom);
    sinon.assert.calledWith(props.L.tileLayer, props.config.tileProvider);
    sinon.assert.calledWith(layerReturn.addTo, mapReturn);
  });


});
