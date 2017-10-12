import {  } from 'mocha';
import * as sinon from 'sinon';

import { createLeafletActions } from '../../src/actions/leaflet';
import { LeafletActions } from '../../src/types/action-types';

describe('leaflet listener actions', () => {

  const
    dispatch = sinon.stub(),
    ev = {
      target: {
        getCenter: sinon.stub().returns({lat: 10, lng: 11}),
        getZoom: sinon.stub().returns(12)
      }
    },
    methods = createLeafletActions(dispatch)
    ;

  describe('moveend', () => {

    before(() => {
      ev.target.getCenter.resetHistory();
      ev.target.getZoom.resetHistory();
      dispatch.resetHistory();
      methods.mooveend((ev as any));
    });

    it('calls L.Map.getCenter', () => {
      sinon.assert.calledOnce(ev.target.getCenter);
    });

    it('dispatches correct action', () => {
      sinon.assert.calledWith(dispatch, sinon.match({
        type: LeafletActions.MOVE_END,
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
        type: LeafletActions.ZOOM_END,
        payload: {
          zoom: 12
        }
      }));
    });

  });

  describe('zoomIn', () => {

    it('dispatch correct action', () => {
      methods.zoomIn();
      sinon.assert.calledWith(dispatch, sinon.match({
        type: LeafletActions.ZOOM_IN,
        payload: null
      }));
    });

  });

  describe('zoomOut', () => {

    it('dispatch correct action', () => {
      methods.zoomOut();
      sinon.assert.calledWith(dispatch, sinon.match({
        type: LeafletActions.ZOOM_OUT,
        payload: null
      }));
    });

  });

});
