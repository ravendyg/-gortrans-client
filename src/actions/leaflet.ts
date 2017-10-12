import { IAction } from '../types';
import { LeafletActions, ILeafletAction } from '../types/action-types';
import { MapStatePayload } from '../types/state';

export function createLeafletActions(
  dispatch: (action: IAction<LeafletActions, MapStatePayload | null>) => void
): ILeafletAction {

  function mooveend(ev: L.LeafletEvent): void {
    const
      coords: L.LatLng = ev.target.getCenter(),
      payload: MapStatePayload = {
        lat: (coords.lat).toString(),
        lng: (coords.lng).toString()
      }
      ;

    dispatch({
      type: LeafletActions.MOVE_END,
      payload
    });
  }

  function zoomend(ev: L.LeafletEvent): void {
    const payload: MapStatePayload = { zoom: ev.target.getZoom() };

    dispatch({
      type: LeafletActions.ZOOM_END,
      payload
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
    mooveend,
    zoomend,
  };
}
