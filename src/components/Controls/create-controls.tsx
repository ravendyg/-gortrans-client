import * as React from 'react';

interface IControlsState {

}

export interface IControlsProps {

}

export function createControlsComponent(connectToApi: () => void) {
  return class ControlsComponent extends React.Component<IControlsState, IControlsProps> {

    constructor() {
      super();
    }

    componentDidMount() {
      connectToApi();
    }

    render() {
      return(
        <div id="controls">controls</div>
      );
    }
  };

}
