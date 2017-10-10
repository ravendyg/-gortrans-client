import { LeafletListenerActions, ControlActions } from '../types/action-types';
import { IAction } from '../types';
import { IMapStateData, MapStatePayload } from '../types/state';
import { config } from '../config';

export function mapState(
  state: IMapStateData = { lat: '0', lng: '0', zoom: 10 },
  action: IAction<LeafletListenerActions | ControlActions, MapStatePayload>
): IMapStateData {

  switch (action.type) {

    case LeafletListenerActions.MOVE_END: {
      return Object.assign({} , state, action.payload);
    }

    case LeafletListenerActions.ZOOM_END: {
      return Object.assign({} , state, action.payload);
    }

    case ControlActions.ZOOM_IN: {
      let zoom = state.zoom + 1;
      if (zoom > config.mapOptions.maxZoom) {
        zoom = config.mapOptions.maxZoom;
      }
      return Object.assign({} , state, {zoom});
    }

    case ControlActions.ZOOM_OUT: {
      let zoom = state.zoom - 1;
      if (zoom < config.mapOptions.minZoom) {
        zoom = config.mapOptions.minZoom;
      }
      return Object.assign({} , state, {zoom});
    }

    default: {
      return state;
    }
  }
}
