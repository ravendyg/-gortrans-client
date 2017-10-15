import * as React from 'react';
import { IWindowProps } from '../types';

export const overlayClass = 'side_panel--overlay';

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

    this.close = this.close.bind(this);
    this.handleClick = this.handleClick.bind(this);
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

  close() {
    this.setState({
      transform: 'translate(-100%, 0)'
    });
    setTimeout(() => {
      this.props.closeMe();
    }, this.timeout);
  }

  handleClick(ev: React.MouseEvent<HTMLDivElement>) {
    const target = ev.target as HTMLElement;
    if (target.getAttribute('class') === overlayClass) {
      this.close();
    }
  }

  handleKeyPressed(ev: KeyboardEvent) {
    if (ev.key === 'Escape') {
      this.close();
    }
  }

  render() {
    return(
      <div
        className={overlayClass}
        onClick={this.handleClick}
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
