import * as React from 'react';
import { Store as IStore } from 'redux';
import { IReduxState } from '../types/state';

  /**
 * override mapState
 * in `componentWillUnmount` call super.componentWillUnmount()
 * * in `componentWillMount` call super.componentWillMount()
 */
export abstract class Connected<IProps, IState> extends React.PureComponent<IProps, IState> {

  private _unsubscribe: () => void;
  private _store: IStore<IReduxState>;

  constructor() {
    super();
    this.subscribeCb = this.subscribeCb.bind(this);
  }

  componentWillMount() {
    this._store = (this.props as any).store;
    if (this._store) {
      this._unsubscribe = this._store.subscribe(this.subscribeCb);
      const newState = this.mapState && this.mapState(this._store.getState());
      this.setState(newState);
    }
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

