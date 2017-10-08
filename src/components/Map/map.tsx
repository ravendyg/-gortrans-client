import * as React from 'react';
import { ICtor, IConfig } from './../../types';

interface IMapState {
  map: L.Map;
}

export interface IMapProps {
  Map: ICtor<L.Map>;
  tileLayer: (urlTemplate: string, options?: L.TileLayerOptions | undefined) => L.TileLayer;
  coords: [number, number];
  zoom: number;
  config: IConfig;
}

export class MapComponent extends React.PureComponent<IMapProps, IMapState> {

  constructor() {
    super();
  }

  componentDidMount() {
    const map = new this.props.Map('mapid');
    map.setView(this.props.coords, this.props.zoom);
    this.props.tileLayer(
      this.props.config.tileProvider,
      this.props.config.mapOptions
    ).addTo(map);
    this.setState({ map });
  }

  render() {
    return(
      <div id="mapid">

      </div>
    );
  }
}
