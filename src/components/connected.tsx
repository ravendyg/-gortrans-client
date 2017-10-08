import * as React from 'react';
import { Store } from 'redux';

/**
 * override mapState
 * in `componentWillUnmount` call super.componentWillUnmount()
 */
export function connect<S>(_store: Store<S>) {
  abstract class Connected<IProps, IState> extends React.Component<IProps, IState> {

    private _unsubscribe: () => void;

    constructor() {
      super();
      this.subscribeCb = this.subscribeCb.bind(this);
      this._unsubscribe = _store.subscribe(this.subscribeCb);
      this.state = this.mapState(_store.getState());
    }

    componentWillUnmount() {
      this._unsubscribe();
    }

    private subscribeCb(): void {
      const st: IState = this.mapState(_store.getState());
      this.setState(st);
    }

    abstract mapState(newStore: S): IState;

  }

  return Connected;
}
