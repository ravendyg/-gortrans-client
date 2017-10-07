// import {config} from './config';
// import {Store} from './store';

// import {connectToApi} from './actions/connection';

// connectToApi(Store.dispatch, localStorage, io, config);

import * as React from 'react';
import { render } from 'react-dom';

import { MapComponent } from './components/Map';
import { ControlsComponent } from './components/Controls';

render(
  <div>
    <MapComponent />
    <ControlsComponent />
  </div>,
  document.getElementById('app')
);
