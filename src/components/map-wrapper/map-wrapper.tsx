import * as React from 'react';
import { IConfig } from '../../types';
import { IActions } from '../../types/action-types';
import { IReduxState, IStore } from '../../types/state';
import { MapComponent } from '../map/map';
import { Connected } from '../connected';

interface IMapWrapperState {
  coords: string [];
  zoom: number;
}

export interface IMapWrapperProps {
  L: any;
  config: IConfig;
  store: IStore<IReduxState>;
  actions: IActions;
}

export class MapWrapperComponent extends Connected<IMapWrapperProps, IMapWrapperState> {

  mapState(globalState: IReduxState): IMapWrapperState {
    const
      {lat, lng, zoom} = globalState.mapState,
      newState: IMapWrapperState = Object.assign({} , this.state, {
        coords: [lat, lng],
        zoom
      })
      ;
    return newState;
  }

  render() {
    const
      coords = this.state.coords,
      zoom = this.state.zoom,
      listeners = this.props.actions.leafletListenerActions
      ;

    return(
      <MapComponent
        L={this.props.L}
        config={this.props.config}
        coords={coords}
        zoom={zoom}
        listeners={listeners}
      />
    );
  }

}
