import * as React from 'react';
import { render } from 'react-dom';
import * as L from 'leaflet';
import * as io from 'socket.io-client';

import { storeFactory } from './store';
import { config } from './config';
import { IActions } from './types/action-types';
import { App } from './components/app';
import { IMapWrapperProps } from './components/map-wrapper/map-wrapper';

/** services */
import { createStorageService } from './services/storage';
import { createRouter } from './services/router';
/** /services */

/** actions */
import { createControlActions } from './actions/control';
import { createConnectToApi } from './actions/connect-to-api';
import { createLeafletActions } from './actions/leaflet';
import { createBusListActions } from './actions/bus-list';
import { createBusSearchActions } from './actions/bus-search';

/** /actions */

/** providers */
import { createBusListProvider } from './providers/bus-list';
import { createBusSearchProvider } from './providers/bus-search';
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
  busSearchAction = createBusSearchActions(Store.dispatch),
  actions: IActions = {
    controlActions,
    leafletActions,
    busListActions,
    busSearchAction,
  },

  initRouting = createRouter(window, Store, controlActions),

  mapProps: IMapWrapperProps = {
    L,
    store: Store,
    config,
    actions
  },
  // providers
  busListProvider = createBusListProvider(busListActions, storageService, config, Date),
  busSearchProvider = createBusSearchProvider(busSearchAction, storageService)
  ;

storageService.watchViewOptions(Store);

busListProvider.subscribe(Store);
busSearchProvider.subscribe(Store);

connectToApi();
initRouting();

render(
  <App
    actions={actions}
    mapProps={mapProps}
    store={Store}
    win={window}
  />,
  document.getElementById('app')
);
