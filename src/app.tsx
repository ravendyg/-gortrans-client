import * as React from 'react';
import { render } from 'react-dom';
import * as L from 'leaflet';

import { MapWrapperComponent, IMapProps } from './components/MapWrapper/map-wrapper';
import { ControlsComponent } from './components/Controls';
import { IControlsProps } from './components/Controls/create-controls';

require('./styles.scss');

const
  mapProps: IMapProps = {
    Map: L.Map,
    actions: {}
  },
  controlProps: IControlsProps = {}
  ;

render(
  <div id="wrapper">
    <MapWrapperComponent {...mapProps} />
    <ControlsComponent {...controlProps} />
  </div>,
  document.getElementById('app')
);
