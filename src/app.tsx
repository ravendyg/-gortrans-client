import * as React from 'react';
import { render } from 'react-dom';

import { MapComponent } from './components/Map';
import { ControlsComponent } from './components/Controls';

require('./styles.scss');

render(
  <div id="wrapper">
    <MapComponent />
    <ControlsComponent />
  </div>,
  document.getElementById('app')
);
