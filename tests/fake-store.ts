import * as sinon from 'sinon';
import { IReduxState } from '../src/types/state';
import { RouterState } from '../src/types/data-types';

export function storeFactory(_newState?: IReduxState) {
  let state: IReduxState = {
    mapState: {
      lat: '10',
      lng: '11',
      zoom: 12
    },
    apiConnection: {
      socket: null,
      error: null,
    },
    appState: RouterState.BLANK,
    busList: {
      query: '',
      list: [],
    },
    translation: {
      lang: 'ru',
      text: {
        searchInputPlaceholder: 'searchInputPlaceholder',
      }
    },
    busSearch: {
      '0': [],
      '1': [],
      '2': [],
      '7': [],
    }
  };

  if (_newState) {
    _setState(_newState);
  }

  function _setState(newState: IReduxState) {
    Object.assign(state, newState);
  }

  const
    subscribe = sinon.stub(),
    dispatch = sinon.stub(),
    getState = sinon.stub().returns(state),
    store: any = {
      getState,
      dispatch,
      subscribe,
      _setState,
      _resetAllHistory() {
        subscribe.resetHistory();
        dispatch.resetHistory();
        getState.resetHistory();
      }
    }
    ;

  return store;
}
