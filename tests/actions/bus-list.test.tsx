import {  } from 'mocha';
import * as sinon from 'sinon';

import { BusListActions } from '../../src/types/action-types';
import { createBusListActions } from '../../src/actions/bus-list';

const
  dispatch: any = sinon.stub(),
  { updateBusList, updateQuery } = createBusListActions(dispatch)
 ;

describe('bus list actions', () => {

  it('dispatches UPDATE_LIST', () => {
    dispatch.resetHistory();
    const list: any = [];
    updateBusList(list);
    sinon.assert.calledWith(dispatch, sinon.match({
      type: BusListActions.UPDATE_LIST,
      payload: {
        list,
        query: ''
      }
    }));
  });

  it('dispatches UPDATE_QUERY', () => {
    dispatch.resetHistory();
    const query = '10';
    updateQuery(query);
    sinon.assert.calledWith(dispatch, sinon.match({
      type: BusListActions.UPDATE_QUERY,
      payload: {
        list: [],
        query: '10'
      }
    }));
  });

});
