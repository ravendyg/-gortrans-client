import * as React from 'react';
import {  } from 'mocha';
import * as sinon from 'sinon';
import { configure, mount } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-15';
configure({ adapter: new Adapter() });

import { Store } from '../../src/store';
import { ConnectionAction } from '../../src/types/action-types';

import { connect } from '../../src/components/connected';

interface IPops {}
interface IState {}
interface IStorePart {}

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

const Connected = connect(Store, 'apiConnection');

class Component extends Connected<IPops, IState, IStorePart> {
  storeChangeCb(newStore: IStorePart) {
    changeStub(newStore);
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

  it('calls storeChangeCb with new state', () => {
    changeStub.resetHistory();
    Store.dispatch({
      type: ConnectionAction.CONNECTED,
      payload: { data: 'data' }
    });
    sinon.assert.calledWith(changeStub, sinon.match({ data: 'data', error: null }));
  });

  it('calls _unsubscribe when component will unmount', () => {
    unsubscribeStub.resetHistory();
    component.unmount();
    sinon.assert.calledOnce(unsubscribeStub);
  });

});
