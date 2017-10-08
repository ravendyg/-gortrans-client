import * as React from 'react';
import { Store } from '../../store';
import { Store as IStore } from 'redux';
import { ICtor, IConfig } from '../../types';
import { IReduxState } from '../../types/state';
import { MapComponent } from '../Map/map';
import { Connected } from '../connected';

interface IMapWrapperState { }

export interface IMapWrapperProps {
  Map: ICtor<L.Map>;
  tileLayer: (urlTemplate: string, options?: L.TileLayerOptions | undefined) => L.TileLayer;
  config: IConfig;
  actions: {

  };
}

export function createMapWrapperComponent(store: IStore<IReduxState>) {
  class MapWrapperComponent extends Connected<IMapWrapperProps, IMapWrapperState> {

      constructor() {
        super(store);
      }

      mapState(): IMapWrapperState {
        return this.state;
      }

      render() {
        const
          coords = this.props.config.defaultCoords,
          zoom = this.props.config.defaultZoom
          ;

        return(
          <MapComponent
            Map={this.props.Map}
            tileLayer={this.props.tileLayer}
            config={this.props.config}
            coords={coords}
            zoom={zoom}
          />
        );
      }
    }

  return MapWrapperComponent;
}

export const MapWrapperComponent = createMapWrapperComponent(Store);
