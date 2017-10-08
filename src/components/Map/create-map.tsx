import * as React from 'react';
import { ICtor } from './../../types';

interface IMapState {
  map: L.Map;
}

export interface IMapProps {
  actions: {

  };
}

export function createMapComponent(_Map: ICtor<L.Map>) {
  return class MapComponent extends React.PureComponent<IMapProps, IMapState> {

    constructor() {
      super();
    }

    componentDidMount() {
      // no unmount hook because htis component exists though the whole app lifetime
      this.setState({ map: new _Map('mapid') });
    }

    render() {
      return(
        <div id="mapid">

        </div>
      );
    }
  };
}
