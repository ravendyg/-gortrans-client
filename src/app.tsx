import * as React from 'react';
import { render } from 'react-dom';
import * as L from 'leaflet';
import * as io from 'socket.io-client';

import { storeFactory } from './store';
import { config } from './config';
import { IActions } from './types/action-types';
import { MapWrapperComponent, IMapWrapperProps } from './components/map-wrapper/map-wrapper';
import { Controls, IControlsProps } from './components/controls/controls';

/** services */
import { createStorageService } from './services/storage';
import { createRouter } from './services/router';
/** /services */

/** actions */
import { createControlActions } from './actions/control';
import { createConnectToApi } from './actions/connect-to-api';
import { createLeafletActions } from './actions/leaflet';
import { createBusListActions } from './actions/bus-list';
/** /actions */

/** providers */
import { createBusListProvider } from './providers/bus-list';
/** /providers */

require('./styles.scss');

const
  storageService = createStorageService(localStorage, config),
  Store = storeFactory(storageService, config),
  // actions
  connectToApi = createConnectToApi(Store.dispatch, localStorage, io, config),
  controlActions = createControlActions(Store.dispatch),
  leafletActions = createLeafletActions(Store.dispatch),
  busListActions = createBusListActions(Store.dispatch),
  actions: IActions = {
    controlActions,
    leafletActions,
    busListActions
  },

  initRouting = createRouter(window, Store, controlActions),

  mapProps: IMapWrapperProps = {
    L,
    store: Store,
    config,
    actions
  },
  controlProps: IControlsProps = {
    actions
  },
  // providers
  busListProvider = createBusListProvider(busListActions, storageService, config, Date)
  ;

storageService.watchViewOptions(Store);
busListProvider.subscribe(Store);

connectToApi();
initRouting();

render(
  <div id="wrapper">
    <MapWrapperComponent {...mapProps} />
    <Controls {...controlProps} />
  </div>,
  document.getElementById('app')
);
