import * as React from 'react';
import { IConfig } from './../../types';
import * as L from 'leaflet';

interface IMapState { }

export interface IMapProps {
  L: any;
  coords: [number, number];
  zoom: number;
  config: IConfig;
  listeners?: {
    zoomend: (ev: L.LeafletEvent) => void;
    moveend: (ev: L.LeafletEvent) => void;
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
    return(
      <div id="mapid">

      </div>
    );
  }

}
