import * as io from 'socket.io-client';

import { Store } from '../store';
import { config } from '../config';

import { createConnectToApi } from './create-connect-to-api';

export const connectToApi = createConnectToApi(
  Store.dispatch, localStorage, io, config
);
