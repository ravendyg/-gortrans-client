import * as React from 'react';
import {} from 'mocha';
import * as sinon from 'sinon';
import { configure, mount } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-15';
configure({ adapter: new Adapter() });

import { MapComponent } from '../../src/components/Map/map';

describe('map component', () => {

  it('instantiates a leaflet map', () => {
    const
      mapReturn: any = {
        setView: sinon.stub()
      },
      _map: any = sinon.stub().returns(mapReturn),
      layerReturn: any = {
        addTo: sinon.stub()
      },
      tileLayer: any = sinon.stub().returns(layerReturn),
      mapOptions: any = {},
      coords: [number, number] = [1, 2],
      props: any = {
        Map: _map,
        tileLayer,
        config: {
          tileProvider: 'tileProvider',
          mapOptions
        },
        coords,
        zoom: 15
      }

      ;
    mount(<MapComponent {...props} />);
    sinon.assert.calledOnce(props.Map);
    sinon.assert.calledWith(mapReturn.setView, sinon.match(coords), props.zoom);
    sinon.assert.calledWith(props.tileLayer, props.config.tileProvider);
    sinon.assert.calledWith(layerReturn.addTo, mapReturn);
  });

});
