import * as React from 'react';
import { render } from 'react-dom';
import * as L from 'leaflet';
import * as io from 'socket.io-client';

import { Store } from './store';
import { config } from './config';
import { IActions } from './types/action-types';
import { MapWrapperComponent, IMapWrapperProps } from './components/map-wrapper/map-wrapper';
import { ControlsComponent, IControlsProps } from './components/controls/controls';

import { createControlActions } from './actions/create-control-actions';
import { createConnectToApi } from './actions/create-connect-to-api';

require('./styles.scss');

const
  defaultCoords: [number, number] = config.defaultCoords as [number, number],
  _config = Object.assign({}, config, { defaultCoords }),
  actions: IActions = {
    connect: createConnectToApi(Store.dispatch, localStorage, io, _config),
    controlActions: createControlActions(Store.dispatch)
  },
  mapProps: IMapWrapperProps = {
    L,
    store: Store,
    config: _config,
    actions: {}
  },
  controlProps: IControlsProps = {
    actions
  }
  ;

render(
  <div id="wrapper">
    <MapWrapperComponent {...mapProps} />
    <ControlsComponent {...controlProps} />
  </div>,
  document.getElementById('app')
);
