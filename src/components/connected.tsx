import * as React from 'react';
import { Store } from 'redux';

/**
 * override storeChangeCb
 * in `componentWillUnmount` call super.componentWillUnmount()
 */
export function connect(_store: Store<any>, storeKey: string) {
  abstract class Connected<IProps, IState, IStorePart> extends React.Component<IProps, IState> {

    private _store: any;
    private _unsubscribe: () => void;

    constructor() {
      super();
      this.subscribeCb = this.subscribeCb.bind(this);
      this._unsubscribe = _store.subscribe(this.subscribeCb);
      this.subscribeCb();
    }

    componentWillUnmount() {
      this._unsubscribe();
    }

    private subscribeCb(): void {
      const _newStore: any = _store.getState()[storeKey];
      if (_newStore !== this._store) {
        this._store = _newStore;
        this.storeChangeCb(this._store);
      }
    }

    abstract storeChangeCb(newStore: IStorePart): void;

  }

  return Connected;
}
