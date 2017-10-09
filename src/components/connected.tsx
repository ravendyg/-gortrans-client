import * as React from 'react';
import { Store as IStore } from 'redux';
import { IReduxState } from '../types/state';

  /**
 * override mapState
 * in `componentWillUnmount` call super.componentWillUnmount()
 */
export abstract class Connected<IProps, IState> extends React.Component<IProps, IState> {

  private _unsubscribe: () => void;
  private _store: IStore<IReduxState>;

  constructor(store: IStore<IReduxState>) {
    super();
    this._store = store;
    this.subscribeCb = this.subscribeCb.bind(this);
    this._unsubscribe = this._store.subscribe(this.subscribeCb);
    this.state = this.mapState(this._store.getState());
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  private subscribeCb(): void {
    const st: IState = this.mapState(this._store.getState());
    this.setState(st);
  }

  abstract mapState(newState: IReduxState): IState;

}

