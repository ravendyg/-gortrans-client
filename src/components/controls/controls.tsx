import * as React from 'react';
import { IPropsWithAction } from '../../types/action-types';
import { Connected } from '../connected';
import { ActionBtns } from './action-btns';

interface IControlsState {

}

export interface IControlsProps extends IPropsWithAction {}

export class Controls extends Connected<IControlsProps, IControlsState> {

  mapState(): IControlsState {
    return this.state;
  }

  render() {
    return(
      <div className="controls">
        <ActionBtns actions={this.props.actions} />
      </div>
    );
  }

}

