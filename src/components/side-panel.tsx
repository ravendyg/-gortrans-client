import * as React from 'react';
import { IWindowProps } from '../types';

interface ISidePanelState {
  transition: string;
  transform: string;
}

export interface ISidePanelProps extends IWindowProps {
  slideLength: string;
  closeMe: () => void;
}

export class SidePanel extends React.PureComponent<ISidePanelProps, ISidePanelState> {

  private timeout: number;

  constructor() {
    super();

    this.state = {
      transform: '',
      transition: ''
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleKeyPressed = this.handleKeyPressed.bind(this);
  }

  componentWillMount() {
    this.timeout = Math.round(parseFloat(this.props.slideLength) * 1000);
    this.state = {
      transition: this.props.slideLength + ' linear',
      transform: 'translate(-100%, 0)'
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        transform: 'translate(0, 0)'
      });
    });

    this.props.win.document.addEventListener('keyup', this.handleKeyPressed);
  }

  componentWillUnmount() {
    this.props.win.document.removeEventListener('keyup', this.handleKeyPressed);
  }

  handleClose() {
    this.setState({
      transform: 'translate(-100%, 0)'
    });
    setTimeout(() => {
      this.props.closeMe();
    }, this.timeout);
  }

  handleKeyPressed(ev: KeyboardEvent) {
    if (ev.key === 'Escape') {
      this.handleClose();
    }
  }

  render() {
    return(
      <div
        className="side_panel--overlay"
        onClick={this.handleClose}
      >
        <div
          className="side_panel--content-wrapper"
          style={{...this.state}}
        >
          { this.props.children }
        </div>
      </div>
    );
  }
}
