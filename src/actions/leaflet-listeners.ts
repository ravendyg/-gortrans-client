import { IAction } from '../types';
import { LeafletListenerActions, ILeafletListenerAction } from '../types/action-types';
import { MapStatePayload } from '../types/state';

export function createLeafletListenersActions(
  dispatch: (action: IAction<LeafletListenerActions, MapStatePayload>) => void
): ILeafletListenerAction {

  function moveend(ev: L.LeafletEvent): void {
    const
      coords: L.LatLng = ev.target.getCenter(),
      payload: MapStatePayload = {
        lat: (coords.lat).toString(),
        lng: (coords.lng).toString()
      }
      ;

    dispatch({
      type: LeafletListenerActions.MOVE_END,
      payload
    });
  }

  function zoomend(ev: L.LeafletEvent): void {
    const payload: MapStatePayload = { zoom: ev.target.getZoom() };

    dispatch({
      type: LeafletListenerActions.ZOOM_END,
      payload
    });
  }

  return {
    moveend,
    zoomend
  };
}
