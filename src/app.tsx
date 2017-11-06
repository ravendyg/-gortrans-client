import * as React from 'react';
import { render } from 'react-dom';
import * as L from 'leaflet';
import * as io from 'socket.io-client';

import { storeFactory } from 'src/store';
import { config } from 'src/config';
import { IMainAction } from 'src/types/action-types';
import { App } from 'src/components/app';
import { IMapWrapperProps } from 'src/components/map-wrapper/map-wrapper';

import { createConnectToApi } from 'src/actions/connect-to-api';
import { createControlActions } from 'src/actions/control';
import { createLeafletActions } from 'src/actions/leaflet';

/** services */
import { createViewStorageService } from 'src/services/storage/map-view';
import { createRouter } from 'src/services/router';
import { mapRouterStateToPanelState } from 'src/services/panel-content';
import { getTranslation } from 'src/services/translations';
/** /services */

require('src/styles.scss');

const
  viewStorageService = createViewStorageService(localStorage, config),
  Store = storeFactory(viewStorageService, config, getTranslation),
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
