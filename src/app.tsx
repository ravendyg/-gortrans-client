import * as React from 'react';
import { render } from 'react-dom';
import * as L from 'leaflet';
import * as io from 'socket.io-client';

import { storeFactory } from './store';
import { config } from './config';
import { IMainAction } from './types/action-types';
import { App } from './components/app';
import { IMapWrapperProps } from './components/map-wrapper/map-wrapper';

import { createConnectToApi } from './actions/connect-to-api';
import { createControlActions } from './actions/control';
import { createLeafletActions } from './actions/leaflet';

/** services */
import { createViewStorageService } from './services/storage/map-view';
import { createRouter } from './services/router';
import { mapRouterStateToPanelState } from './services/panel-content';
/** /services */

require('./styles.scss');

const
  viewStorageService = createViewStorageService(localStorage, config),
  Store = storeFactory(viewStorageService, config),
  connectToApi = createConnectToApi(Store.dispatch, localStorage, io, config),

  actions: IMainAction = {
    controlActions: createControlActions(Store.dispatch),
    leafletActions: createLeafletActions(Store.dispatch),
  },

  initRouting = createRouter(window, Store, actions.controlActions),

  mapProps: IMapWrapperProps = {
    L,
    store: Store,
    config,
    actions
  }
  ;

viewStorageService.watchViewOptions(Store);

connectToApi();
initRouting();

render(
  <App
    actions={actions}
    mapRouterStateToPanelState={mapRouterStateToPanelState}
    mapProps={mapProps}
    store={Store}
    win={window}
  />,
  document.getElementById('app')
);
