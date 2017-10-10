import * as React from 'react';
import { IConfig } from '../../types';
import { IActions } from '../../types/action-types';
import { IReduxState, IStore } from '../../types/state';
import { MapComponent } from '../map/map';
import { Connected } from '../connected';

interface IMapWrapperState { }

export interface IMapWrapperProps {
  L: any;
  config: IConfig;
  store: IStore<IReduxState>;
  actions: IActions;
}

export class MapWrapperComponent extends Connected<IMapWrapperProps, IMapWrapperState> {

  mapState(): IMapWrapperState {
    return this.state;
  }

  render() {
    const
      coords = this.props.config.defaultCoords,
      zoom = this.props.config.defaultZoom,
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
