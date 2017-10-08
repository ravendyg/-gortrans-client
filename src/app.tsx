import * as React from 'react';
import { render } from 'react-dom';

import { MapComponent } from './components/Map';
import { IMapProps } from './components/Map/create-map';
import { ControlsComponent } from './components/Controls';
import { IControlsProps } from './components/Controls/create-controls';

require('./styles.scss');

const
  mapProps: IMapProps = {
    actions: {}
  },
  controlProps: IControlsProps = {}
  ;

render(
  <div id="wrapper">
    <MapComponent {...mapProps} />
    <ControlsComponent {...controlProps} />
  </div>,
  document.getElementById('app')
);
