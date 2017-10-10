import * as React from 'react';
import { render } from 'react-dom';
import * as L from 'leaflet';
import * as io from 'socket.io-client';

import { Store } from './store';
import { config } from './config';
import { IActions } from './types/action-types';
import { MapWrapperComponent, IMapWrapperProps } from './components/map-wrapper/map-wrapper';
import { Controls, IControlsProps } from './components/controls/controls';

import { createControlActions } from './actions/create-control';
import { createConnectToApi } from './actions/create-connect-to-api';
import { createLeafletListenersActions } from './actions/create-leaflet-listeners';
import { createStorageService } from './services/storage';

require('./styles.scss');

const
  storageService = createStorageService(localStorage, config),
  connectToApi = createConnectToApi(Store.dispatch, localStorage, io, config),
  controlActions = createControlActions(Store.dispatch),
  leafletListenerActions = createLeafletListenersActions(Store.dispatch),
  actions: IActions = {
    controlActions,
    leafletListenerActions
  },
  mapProps: IMapWrapperProps = {
    L,
    store: Store,
    config,
    actions
  },
  controlProps: IControlsProps = {
    actions
  }
  ;

storageService.watchViewOptions(Store);
connectToApi();

render(
  <div id="wrapper">
    <MapWrapperComponent {...mapProps} />
    <Controls {...controlProps} />
  </div>,
  document.getElementById('app')
);
