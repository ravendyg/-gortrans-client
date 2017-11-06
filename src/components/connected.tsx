import * as React from 'react';
import { Store as IStore } from 'redux';

// is there a better way to create two similar classes extending different ones?

function _componentWillMount<T>(
  self: React.Component, store: IStore<T>, mapState: (newState: T) => any | null
) {
  if (store) {
    (self as any)._unsubscribe = store.subscribe(() => {
      _subscribeCb<T>(self, store, mapState);
    });
    const newState = mapState(store.getState());
    if (newState) {
      self.setState(newState);
    }
  } else {
    (self as any)._unsubscribe = () => {/**/};
  }
}

function _subscribeCb<T>(self: React.Component, store: IStore<T>, mapState: (newState: T) => any) {
  const
    globalState: T = store.getState(),
    st = mapState(globalState)
  ;

  self.setState(st);
}

/**
 * override mapState
 * in `componentWillUnmount` call super.componentWillUnmount()
 * in `componentWillMount` call super.componentWillMount()
 */
export abstract class Connected<IProps, IState, IStoreState> extends React.PureComponent<IProps, IState> {

  private _unsubscribe: () => void;
  private _store: IStore<IStoreState>;

  constructor() {
    super();
    this.subscribeCb = this.subscribeCb.bind(this);
    this.mapState = this.mapState.bind(this);
  }

  componentWillMount() {
    _componentWillMount(this, (this.props as any).store, this.mapState);
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  private subscribeCb(): void {
    _subscribeCb(this, this._store, this.mapState);
  }

  abstract mapState(newState: IStoreState): IState | null;

}

/**
 * override mapState
 * in `componentWillUnmount` call super.componentWillUnmount()
 * in `componentWillMount` call super.componentWillMount()
 */
export abstract class ConnectedNotPure<IProps, IState, IStoreState> extends React.Component<IProps, IState> {

  private _unsubscribe: () => void;
  private _store: IStore<IStoreState>;

  constructor() {
    super();
    this.subscribeCb = this.subscribeCb.bind(this);
    this.mapState = this.mapState.bind(this);
  }

  componentWillMount() {
    _componentWillMount(this, (this.props as any).store, this.mapState);
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  private subscribeCb(): void {
    _subscribeCb(this, this._store, this.mapState);
  }

  abstract mapState(newState: IStoreState): IState | null;

}

