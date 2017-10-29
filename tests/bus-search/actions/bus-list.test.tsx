import * as sinon from 'sinon';

import { BusListActions } from '../../../src/modules/bus-search/types';
import { createBusListActions } from '../../../src/modules/bus-search/actions/bus-list';
import { BusCodes } from '../../../src/types/enums';

const
  dispatch: any = sinon.stub(),
  { updateBusList, updateQuery, updateType } = createBusListActions(dispatch)
 ;

describe('bus list actions', () => {

  it('dispatches UPDATE_LIST', () => {
    dispatch.resetHistory();
    updateBusList([]);
    sinon.assert.calledWith(dispatch, sinon.match({
      type: BusListActions.UPDATE_LIST,
      payload: {
        list: [],
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

  it('dispatches SELECT_TYPE', () => {
    dispatch.resetHistory();
    const type = BusCodes.SHUTTLE;
    updateType(type);
    sinon.assert.calledWith(dispatch, sinon.match({
      type: BusListActions.SELECT_TYPE,
      payload: {
        list: [],
        query: '',
        type: BusCodes.SHUTTLE,
      }
    }));
  });

});
