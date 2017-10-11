import {  } from 'mocha';
import * as sinon from 'sinon';

import { createLeafletListenersActions } from '../../src/actions/leaflet-listeners';
import { LeafletListenerActions } from '../../src/types/action-types';

describe('leaflet listener actions', () => {

  const
    dispatch = sinon.stub(),
    ev = {
      target: {
        getCenter: sinon.stub().returns({lat: 10, lng: 11}),
        getZoom: sinon.stub().returns(12)
      }
    },
    methods = createLeafletListenersActions(dispatch)
    ;

  describe('moveend', () => {

    before(() => {
      ev.target.getCenter.resetHistory();
      ev.target.getZoom.resetHistory();
      dispatch.resetHistory();
      methods.moveend((ev as any));
    });

    it('calls L.Map.getCenter', () => {
      sinon.assert.calledOnce(ev.target.getCenter);
    });

    it('dispatches correct action', () => {
      sinon.assert.calledWith(dispatch, sinon.match({
        type: LeafletListenerActions.MOVE_END,
        payload: {
          lat: '10', lng: '11'
        }
      }));
    });

  });

  describe('zoomend', () => {

    before(() => {
      ev.target.getCenter.resetHistory();
      ev.target.getZoom.resetHistory();
      dispatch.resetHistory();
      methods.zoomend((ev as any));
    });

    it('calls L.Map.getZoom', () => {
      sinon.assert.calledOnce(ev.target.getZoom);
    });

    it('dispatches correct action', () => {
      sinon.assert.calledWith(dispatch, sinon.match({
        type: LeafletListenerActions.ZOOM_END,
        payload: {
          zoom: 12
        }
      }));
    });

  });

});
