import * as React from 'react';

interface IMapState {

}

export interface IMapProps {
  actions: {

  };
}

export function createMapComponent(_Map: { new(...args: any[]): L.Map }) {
  return class MapComponent extends React.Component<IMapState, IMapProps> {

    private map: L.Map;

    constructor() {
      super();
    }

    componentDidMount() {
      this.map = new _Map('mapid');
    }

    render() {
      return(
        <div id="mapid">

        </div>
      );
    }
  };
}
