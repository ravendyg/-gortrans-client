import * as React from 'react';
import { Store as IStore } from 'redux';
import { IReduxState } from '../types/state';

// is there a better way to create two similar classes extending different ones?

function _componentWillMount(
  self: React.Component, store: IStore<IReduxState>, mapState: (newState: IReduxState) => any
) {
  if (store) {
    (self as any)._unsubscribe = store.subscribe(() => {
      _subscribeCb(self, store, mapState);
    });
    const newState = mapState(store.getState());
    self.setState(newState);
  } else {
    (self as any)._unsubscribe = () => {/**/};
  }
}

function _subscribeCb(self: React.Component, store: IStore<IReduxState>, mapState: (newState: IReduxState) => any) {
  const
    globalState: IReduxState = store.getState(),
    st = mapState(globalState)
  ;

  self.setState(st);
}

/**
 * override mapState
 * in `componentWillUnmount` call super.componentWillUnmount()
 * in `componentWillMount` call super.componentWillMount()
 */
export abstract class Connected<IProps, IState> extends React.PureComponent<IProps, IState> {

  private _unsubscribe: () => void;
  private _store: IStore<IReduxState>;

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

  abstract mapState(newState: IReduxState): IState;

}

/**
 * override mapState
 * in `componentWillUnmount` call super.componentWillUnmount()
 * in `componentWillMount` call super.componentWillMount()
 */
export abstract class ConnectedNotPure<IProps, IState> extends React.Component<IProps, IState> {

  private _unsubscribe: () => void;
  private _store: IStore<IReduxState>;

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

  abstract mapState(newState: IReduxState): IState;

}

