import * as React from 'react';
import { render } from 'react-dom';
import * as L from 'leaflet';
import * as io from 'socket.io-client';

import { storeFactory } from './store';
import { config } from './config';
import { IActions } from './types/action-types';
import { App } from './components/app';
import { IMapWrapperProps } from './components/map-wrapper/map-wrapper';

import { createConnectToApi } from './actions/connect-to-api';
import { createActions } from './actions';

/** services */
import { createViewStorageService } from './services/storage/map-view';
import { createBusListStorageService } from './services/storage/bus-list';
import { createRouter } from './services/router';
/** /services */

/** providers */
import { createBusListProvider } from './providers/bus-list';

/** /providers */

require('./styles.scss');

const
  viewStorageService = createViewStorageService(localStorage, config),
  busListStorageService = createBusListStorageService(localStorage, config),
  Store = storeFactory(viewStorageService, config),
  connectToApi = createConnectToApi(Store.dispatch, localStorage, io, config),

  actions: IActions = createActions({ dispatch: Store.dispatch }),

  initRouting = createRouter(window, Store, actions.controlActions),

  mapProps: IMapWrapperProps = {
    L,
    store: Store,
    config,
    actions
  },
  // providers
  busListProvider = createBusListProvider(actions.busListActions, busListStorageService, config, Date)
  ;

viewStorageService.watchViewOptions(Store);

busListProvider.subscribe(Store);

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
