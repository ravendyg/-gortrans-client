import * as io from 'socket.io-client';

import { Store } from '../store';
import { config } from '../config';

import { createConnectToApi } from './create-connect-to-api';

const
  defaultCoords: [number, number] = config.defaultCoords as [number, number],
  _config = Object.assign({}, config, { defaultCoords })
  ;

export const connectToApi = createConnectToApi(
  Store.dispatch, localStorage, io, _config
);
