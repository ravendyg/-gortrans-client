import * as React from 'react';
import { IConfig } from './../../types';
import * as L from 'leaflet';

interface IMapState { }

export interface IMapProps {
  L: any;
  coords: [number, number];
  zoom: number;
  config: IConfig;
}

export class MapComponent extends React.PureComponent<IMapProps, IMapState> {

  private _map: L.Map;

  componentDidMount() {
    const
      map = new this.props.L.Map('mapid', {
        zoomControl: false
      })
      ;
    map.setView(this.props.coords, this.props.zoom);
    this.props.L.tileLayer(
      this.props.config.tileProvider,
      this.props.config.mapOptions
    ).addTo(map);
    this._map = map;
  }

  render() {
    return(
      <div id="mapid">

      </div>
    );
  }

}
