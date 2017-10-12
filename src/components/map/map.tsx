import * as React from 'react';
import { IConfig } from './../../types';
import * as L from 'leaflet';

interface IMapState { }

export interface IMapProps {
  L: any;
  coords: string [];
  zoom: number;
  config: IConfig;
  listeners?: {
    zoomend: (ev: L.LeafletEvent) => void;
    mooveend: (ev: L.LeafletEvent) => void;
  };
  actionWrappers?: {

  };
}

function addListeners(map: L.Map, listeners: {[x: string]: (ev: L.LeafletEvent) => void}) {
  Object.keys(listeners)
  .forEach((eventName: string) => {
    map.on(eventName, listeners[eventName]);
  })
  ;
}

export class MapComponent extends React.PureComponent<IMapProps, IMapState> {

  private _map: L.Map;

  componentDidMount() {
    const
      {L, config, listeners = {}, coords, zoom} = this.props,
      map = new L.Map('mapid', {
        zoomControl: false
      })
      ;
    map.setView(coords, zoom);
    L.tileLayer(
      config.tileProvider,
      config.mapOptions
    ).addTo(map);
    this._map = map;

    addListeners(map, listeners);
  }

  render() {
    const
      {coords, zoom} = this.props
      ;

    if (this._map) {
      const {lat, lng} = this._map.getCenter();
      // change map view only if it change in the state was caused by an external action
      if (
        lat.toString() !== coords[0]
        || lng.toString() !== coords[1]
        || this._map.getZoom() !== zoom
      ) {
        this._map.setView([parseFloat(coords[0]), parseFloat(coords[1])], zoom);
      }
    }
    return(
      <div id="mapid">

      </div>
    );
  }

}
