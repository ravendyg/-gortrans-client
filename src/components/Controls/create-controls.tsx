import * as React from 'react';

interface IControlsState {

}

export interface IControlsProps {

}

export function createControlsComponent(connectToApi: () => void) {
  return class ControlsComponent extends React.PureComponent<IControlsProps, IControlsState> {

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
