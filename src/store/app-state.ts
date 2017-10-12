import { LeafletActions } from '../types/action-types';
import { IAction, IConfig } from '../types';
import { IMapState, MapStatePayload } from '../types/state';

export function createMapState(defViewOptions: IMapState, config: IConfig) {
  return function mapState(
    state: IMapState = defViewOptions,
    action: IAction<LeafletActions, MapStatePayload>
  ): IMapState {

    switch (action.type) {

      case LeafletActions.MOVE_END: {
        let newState: IMapState = Object.assign({}, state);
        newState.lat = action.payload.lat as string;
        newState.lng = action.payload.lng as string;
        return newState;
      }

      case LeafletActions.ZOOM_END: {
        let newState: IMapState = Object.assign({}, state);
        newState.zoom = action.payload.zoom as number;
        return newState;
      }

      case LeafletActions.ZOOM_IN: {
        let zoom = state.zoom + 1;
        if (zoom > config.mapOptions.maxZoom) {
          zoom = config.mapOptions.maxZoom;
        }
        return Object.assign({} , state, {zoom});
      }

      case LeafletActions.ZOOM_OUT: {
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