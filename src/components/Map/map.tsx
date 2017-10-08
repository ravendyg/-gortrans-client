import * as React from 'react';
import { ICtor } from './../../types';

interface IMapState {
  map: L.Map;
}

export interface IMapProps {
  Map: ICtor<L.Map>;
}


export class MapComponent extends React.PureComponent<IMapProps, IMapState> {

  constructor() {
    super();
  }

  componentDidMount() {
    const map = new this.props.Map('mapid');
    this.setState({ map });
  }

  render() {
    return(
      <div id="mapid">

      </div>
    );
  }
}
