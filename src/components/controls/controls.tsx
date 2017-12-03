import * as React from 'react';
import { IPropsWithAction } from '../../types/action-types';
import { IReduxState } from '../../types/state';
import { Connected } from '../connected';
import { ActionBtns } from './action-btns';

interface IControlsState {

}

export interface IControlsProps extends IPropsWithAction {}

export class Controls extends Connected<IControlsProps, IControlsState, IReduxState> {

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

