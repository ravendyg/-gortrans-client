import { LeafletActions, ILeafletAction } from '../types/action-types';
import { IMapState } from '../types/state';

function createMapStatePayload(ev: L.LeafletEvent): IMapState {
  const
    coords: L.LatLng = ev.target.getCenter(),
    payload: IMapState = {
      lat: (coords.lat).toString(),
      lng: (coords.lng).toString(),
      zoom: ev.target.getZoom(),
    }
    ;
  return payload;
}

export type LeafletActionTypes = {
  type: LeafletActions;
  payload: IMapState | null;
};

export function createLeafletActions(
  dispatch: (action: LeafletActionTypes) => void
): ILeafletAction {

  function moveend(ev: L.LeafletEvent): void {
    dispatch({
      type: LeafletActions.MOVE_END,
      payload: createMapStatePayload(ev)
    });
  }

  function zoomend(ev: L.LeafletEvent): void {
    dispatch({
      type: LeafletActions.ZOOM_END,
      payload: createMapStatePayload(ev)
    });
  }

  function zoomIn(): void {
    dispatch({
      type: LeafletActions.ZOOM_IN,
      payload: null
    });
  }

  function zoomOut(): void {
    dispatch({
      type: LeafletActions.ZOOM_OUT,
      payload: null
    });
  }

  return {
    zoomIn,
    zoomOut,
    moveend,
    zoomend,
  };
}
