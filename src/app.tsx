import * as React from 'react';
import { render } from 'react-dom';
import * as L from 'leaflet';

import { config } from './config';
import { MapWrapperComponent, IMapWrapperProps } from './components/MapWrapper/map-wrapper';
import { ControlsComponent } from './components/Controls';
import { IControlsProps } from './components/Controls/create-controls';

require('./styles.scss');

const
  defaultCoords: [number, number] = config.defaultCoords as [number, number],
  _config = Object.assign({}, config, { defaultCoords }),
  mapProps: IMapWrapperProps = {
    L,
    config: _config,
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
