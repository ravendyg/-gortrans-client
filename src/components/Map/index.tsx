import * as React from 'react';

interface IMapState {

}

export interface IMapProps {
  actions: {

  };
}

export class MapComponent extends React.Component<IMapState, IMapProps> {

  constructor() {
    super();

  }

  render() {
    return(
      <div>map</div>
    );
  }
}
