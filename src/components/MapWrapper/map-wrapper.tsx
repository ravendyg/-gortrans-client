import * as React from 'react';
import { ICtor } from './../../types';
import { MapComponent } from '../Map/map';

interface IMapState {
  map: L.Map;
}

export interface IMapProps {
  Map: ICtor<L.Map>;
  actions: {

  };
}

export class MapWrapperComponent extends React.PureComponent<IMapProps, IMapState> {

  constructor() {
    super();
  }

  render() {
    return(
      <MapComponent Map={this.props.Map} />
    );
  }
}
