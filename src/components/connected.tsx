import * as React from 'react';
import { Store as IStore } from 'redux';

// is there a better way to create two similar classes extending different ones?

function _componentWillMount<T>(
  self: React.Component, store: IStore<T>, mapState: (newState: T) => any | null
) {
  const component = self as any;
  if (store) {
    let mounted = true;
    const unsub = store.subscribe(() => {
      if (mounted) {
        _subscribeCb<T>(self, store, mapState);
      }
    });
    component._unsubscribe = () => {
      // workaround for the cases when a component unmounted during a dispatch loop
      mounted = false;
      unsub();
    };
    const newState = mapState(store.getState());
    if (newState) {
      self.setState(newState);
    }
    (component._unsubscribe as any).n = self.constructor.name;
  } else {
    component._unsubscribe = () => {/**/};
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
  public mounted: boolean;

  constructor() {
    super();
    // can't use an arrow function to keep this method abstract and not get a function/property error
    this.mapState = this.mapState.bind(this);
  }

  componentWillMount() {
    _componentWillMount(this, (this.props as any).store, this.mapState);
  }

  componentWillUnmount() {
    this._unsubscribe();
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

  constructor() {
    super();
    // can't use an arrow function to keep this method abstract and not get a function/property error
    this.mapState = this.mapState.bind(this);
  }

  componentWillMount() {
    _componentWillMount(this, (this.props as any).store, this.mapState);
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  abstract mapState(newState: IStoreState): IState | null;
}

