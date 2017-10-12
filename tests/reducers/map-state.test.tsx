import {  } from 'mocha';
import { assert } from 'chai';
import * as sinon from 'sinon';

import { LeafletActions } from '../../src/types/action-types';
import { IMapState } from '../../src/types/state';
import { createMapState } from '../../src/store/map-state';

const
  config: any = {
    mapOptions: {
      maxZoom: 20,
      minZoom: 5
    }
  },
  storageService: any = {
    getDefaultViewOptions: sinon.stub()
  },
  mapState = createMapState(storageService, config)
  ;

function createDefaultState(zoom?: number): IMapState {
  return { lat: '1', lng: '2', zoom: zoom || 3 };
}

describe('map state reducer', () => {

  it('move end', () => {
    const
      state = createDefaultState(),
      payload: IMapState = {
        lat: '4', lng: '5', zoom: 6
      },
      newState = mapState(state, {
        type: LeafletActions.MOVE_END,
        payload
      })
      ;

    assert.deepEqual(newState, Object.assign({}, state, payload));
  });

  it('zoom end', () => {
    const
      state = createDefaultState(),
      payload: IMapState = {
        lat: '100', lng: '101', zoom: 10
      },
      newState = mapState(state, {
        type: LeafletActions.ZOOM_END,
        payload
      })
      ;

    assert.deepEqual(newState, Object.assign({}, state, payload));
  });

  it('increases zoom on "zoom in"', () => {
    const
      state = createDefaultState(10),
      payload: any = {},
      newState = mapState(state, {
        type: LeafletActions.ZOOM_IN,
        payload
      })
      ;

    assert.equal(newState.zoom, 11);
  });

  it('does not increases zoom on "zoom in" if max reached', () => {
    const
      state = createDefaultState(20),
      payload: any = {},
      newState = mapState(state, {
        type: LeafletActions.ZOOM_IN,
        payload
      })
      ;

    assert.equal(newState.zoom, 20);
  });

  it('decreases zoom on "zoom out"', () => {
    const
      state = createDefaultState(10),
      payload: any = {},
      newState = mapState(state, {
        type: LeafletActions.ZOOM_OUT,
        payload
      })
      ;

    assert.equal(newState.zoom, 9);
  });

  it('does not decreases zoom on "zoom out" if max reached', () => {
    const
      state = createDefaultState(5),
      payload: any = {},
      newState = mapState(state, {
        type: LeafletActions.ZOOM_OUT,
        payload
      })
      ;

    assert.equal(newState.zoom, 5);
  });

  it('ignores unknown action', () => {
    const
      state = createDefaultState(),
      payload: any = 'socket',
      action: any = {
        type: 'type',
        payload
      },
      newState = mapState(state, action)
      ;

      assert.deepEqual(newState, state);
  });

});
