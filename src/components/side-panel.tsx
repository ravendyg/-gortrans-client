import * as React from 'react';
import { IWindowProps } from '../types';

export const overlayClass = 'side_panel--overlay';

interface ISidePanelState {
  transition: string;
  transform: string;
  backgroundColor: string;
}

export interface ISidePanelProps extends IWindowProps {
  slideLength: string;
  closeMe: () => void;
}

export class SidePanel extends React.PureComponent<ISidePanelProps, ISidePanelState> {

  private timeout: number;

  constructor() {
    super();

    // this.state = {
    //   backgroundColor: 'rgba(0,0,0,0)',
    //   transform: '',
    //   transition: '',
    // };

    this.close = this.close.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPressed = this.handleKeyPressed.bind(this);
  }

  componentWillMount() {
    this.timeout = Math.round(parseFloat(this.props.slideLength) * 1000);
    this.state = {
      backgroundColor: 'rgba(0,0,0,0)',
      transition: this.props.slideLength + ' linear',
      transform: 'translate(-100%, 0)',
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        backgroundColor: 'rgba(0,0,0,0.5)',
        transform: 'translate(0, 0)',
      });
    });

    this.props.win.document.addEventListener('keyup', this.handleKeyPressed);
  }

  componentWillUnmount() {
    this.props.win.document.removeEventListener('keyup', this.handleKeyPressed);
  }

  close() {
    this.setState({
      backgroundColor: 'rgba(0,0,0,0)',
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
        style={{
          backgroundColor: this.state.backgroundColor,
          transition: this.state.transition,
        }}
      >
        <div
          className="side_panel--content-wrapper"
          style={{
            transform: this.state.transform,
            transition: this.state.transition,
          }}
        >
          { this.props.children }
        </div>
      </div>
    );
  }
}
