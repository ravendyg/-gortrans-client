import { LeafletListenerActions, ControlActions } from '../types/action-types';
import { IAction, IConfig } from '../types';
import { IMapStateData, MapStatePayload } from '../types/state';

export function createMapState(defViewOptions: IMapStateData, config: IConfig) {
  return function mapState(
    state: IMapStateData = defViewOptions,
    action: IAction<LeafletListenerActions | ControlActions, MapStatePayload>
  ): IMapStateData {

    switch (action.type) {

      case LeafletListenerActions.MOVE_END: {
        let newState: IMapStateData = Object.assign({}, state);
        newState.lat = action.payload.lat as string;
        newState.lng = action.payload.lng as string;
        return newState;
      }

      case LeafletListenerActions.ZOOM_END: {
        let newState: IMapStateData = Object.assign({}, state);
        newState.zoom = action.payload.zoom as number;
        return newState;
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
  };
}
