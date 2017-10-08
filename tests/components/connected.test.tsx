import * as React from 'react';
import {  } from 'mocha';
import * as sinon from 'sinon';
import { assert } from 'chai';
import { configure, mount } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-15';
configure({ adapter: new Adapter() });

import { Store } from '../../src/store';
import { IReduxState } from '../../src/types/state';
import { ConnectionAction } from '../../src/types/action-types';

import { connect } from '../../src/components/connected';

interface IPops {}
interface IState {
  connection: SocketIOClient.Socket | null;
}

const
  subStub = sinon.stub(),
  changeStub = sinon.stub(),
  unsubscribeStub = sinon.stub(),
  oldSubscribe = Store.subscribe
  ;

Store.subscribe = cb => {
  subStub();
  const unsub = oldSubscribe(cb);
  return unsubscribeStub.callsFake(() => {
    unsub();
  });
};

const Connected = connect(Store);

class Component extends Connected<IPops, IState> {

  constructor() {
    super();
  }

  mapState(newStore: IReduxState): IState {
    changeStub(newStore.apiConnection);
    return { connection: newStore.apiConnection.data };
  }

  componentWillUnmount() {
    super.componentWillUnmount();
  }

  render() {
    return(<div></div>);
  }
}

const component = mount(<Component />);

describe('connect', () => {

  it('subscribes to store changes', () => {
    sinon.assert.calledOnce(subStub);
  });

  it('calls storeChangeCb with new state', done => {
    changeStub.resetHistory();
    Store.dispatch({
      type: ConnectionAction.CONNECTED,
      payload: { data: 'data' }
    });
    setTimeout(() => {
      try {
        assert.deepEqual(component.state(), { connection: 'data'});
        sinon.assert.calledWith(changeStub, sinon.match({ data: 'data', error: null }));
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  it('calls _unsubscribe when component will unmount', () => {
    unsubscribeStub.resetHistory();
    component.unmount();
    sinon.assert.calledOnce(unsubscribeStub);
  });

});
