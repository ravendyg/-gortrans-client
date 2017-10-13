import * as React from 'react';

interface ISidePanelState {
  className: string;
}

export interface ISidePanelProps {

}

export class SidePanel extends React.Component<ISidePanelProps, ISidePanelState> {

  constructor() {
    super();
    this.state = {
      className: 'side_panel--menu',
    };
  }

  componenDidMount() {
    this.setState({
      className: 'side_panel--menu__opened',
    });
  }

  render() {
    return(
      <div className="side_panel--overlay">
        <div className={this.state.className}>
          { this.props.children }
        </div>
      </div>
    );
  }
}
