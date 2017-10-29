import * as sinon from 'sinon';

import { BusSearchActions } from 'src/modules/bus-search/types';
import { IBusSearchState } from 'src/modules/bus-search/types';
import { createBusSearchActions } from 'src/modules/bus-search/actions/bus-search';
import { BusSearch } from 'src/types/data-types';
import { BusCodes } from 'src/types/enums';

const
  dispatch: any = sinon.stub(),
  { updateAllHistory, updateHistory } = createBusSearchActions(dispatch)
 ;

describe('bus search actions', () => {

  it('dispatches RESET_SEARCH_HISTORY', () => {
    dispatch.resetHistory();
    const history: IBusSearchState = {
    };
    updateAllHistory(history);
    sinon.assert.calledWith(dispatch, sinon.match({
      type: BusSearchActions.RESET_SEARCH_HISTORY,
      payload: history
    }));
  });

  it('dispatches UPDATE_QUERY', () => {
    dispatch.resetHistory();
    const busSearch: BusSearch = { title: 'title', marsh: 'marsh' };
    updateHistory(BusCodes.BUS, busSearch);
    sinon.assert.calledWith(dispatch, sinon.match({
      type: BusSearchActions.ADD_TO_HISTORY,
      payload: {
        key: BusCodes.BUS,
        busSearch,
      }
    }));
  });

});
