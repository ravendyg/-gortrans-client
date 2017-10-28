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
import { createBusListActions } from './actions/bus-list';
import { createControlActions } from './actions/control';
import { createLeafletActions } from './actions/leaflet';

/** services */
import { createViewStorageService } from './services/storage/map-view';
import { createBusListStorageService } from './services/storage/bus-list';
import { createRouter } from './services/router';
import { mapRouterStateToPanelState } from './services/panel-content';
/** /services */

/** providers */
import { createBusListProvider } from './providers/bus-list';

/** /providers */

require('./styles.scss');

function startApp() {
  const
    viewStorageService = createViewStorageService(localStorage, config),
    busListStorageService = createBusListStorageService(localStorage, config),
    Store = storeFactory(viewStorageService, config),
    connectToApi = createConnectToApi(Store.dispatch, localStorage, io, config),

    actions: IMainAction = {
      controlActions: createControlActions(Store.dispatch),
      leafletActions: createLeafletActions(Store.dispatch),
    },
    busListActions = createBusListActions(Store.dispatch),

    initRouting = createRouter(window, Store, actions.controlActions),

    mapProps: IMapWrapperProps = {
      L,
      store: Store,
      config,
      actions
    },
    // providers
    busListProvider = createBusListProvider(busListActions, busListStorageService, config, Date)
    ;

  viewStorageService.watchViewOptions(Store);

  busListProvider.subscribe(Store);

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
}

if (config.old) {
  (require as any).ensure(['polyfills'], startApp);
} else {
  startApp();
}


