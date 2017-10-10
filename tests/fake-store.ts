import * as sinon from 'sinon';
import { IReduxState } from '../src/types/state';

const
  getState: () => IReduxState = () => ({
    apiConnection: {
      data: null,
      error: null
    },
    mapState: {
      lat: '10',
      lng: '11',
      zoom: 12
    }
  })
  ;
export const store: any = {
    getState,
    subscribe: sinon.stub()
  }
  ;
