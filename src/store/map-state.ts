import { LeafletActions } from 'src/types/action-types';
import { IConfig } from 'src/types';
import { IMapState } from 'src/types/state';
import { assertNever } from 'src/services/assertNever';
import { LeafletActionTypes } from 'src/actions/leaflet';

export function createMapState(defViewOptions: IMapState, config: IConfig) {
  return function mapState(
    state: IMapState = defViewOptions,
    action: LeafletActionTypes,
  ): IMapState {

    let newState = state;

    switch (action.type) {

      case LeafletActions.MOVE_END: {
        newState = Object.assign({}, state, action.payload);
        break;
      }

      case LeafletActions.ZOOM_END: {
        newState = Object.assign({}, state, action.payload);
        break;
      }

      case LeafletActions.ZOOM_IN: {
        let zoom = state.zoom + 1;
        if (zoom > config.mapOptions.maxZoom) {
          zoom = config.mapOptions.maxZoom;
        }
        newState = Object.assign({} , state, {zoom});
        break;
      }

      case LeafletActions.ZOOM_OUT: {
        let zoom = state.zoom - 1;
        if (zoom < config.mapOptions.minZoom) {
          zoom = config.mapOptions.minZoom;
        }
        newState = Object.assign({} , state, {zoom});
        break;
      }

      default: {
        assertNever(action.type);
      }
    }

    return newState;
  };
}
