import * as React from 'react';
import {} from 'mocha';
import * as sinon from 'sinon';
import { mount } from 'enzyme';

import { MapComponent } from '../../../src/components/map/map';

describe('<MapComponent>', () => {

  const
    mapReturn: any = {
      setView: sinon.stub(),
      removeControl: sinon.stub(),
      on: sinon.stub()
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
      zoom: 15,
      listeners: {
        'moveend': () => {/**/}
      }
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

  it('adds listeners to the map', () => {
    sinon.assert.calledWith(mapReturn.on, 'moveend', props.listeners.moveend);
  });

});
