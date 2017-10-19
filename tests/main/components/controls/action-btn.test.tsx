import * as React from 'react';
import {} from 'mocha';
import { assert } from 'chai';
import * as sinon from 'sinon';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-15';
configure({ adapter: new Adapter() });

import { ActionBtn } from '../../../../src/components/controls/action-btn';

describe('<ActionBtn>', () => {

  const
    props: any = {
      click: sinon.stub()
    },
    btn: ShallowWrapper = shallow(<ActionBtn {...props} />),
    wrapper: ShallowWrapper = btn.find('div').at(0)
    ;

  it('renders content', () => {
    assert.isDefined(wrapper);
  });

  it('calls click prop when clicked', () => {
    props.click.resetHistory();
    wrapper.simulate('click');
    sinon.assert.calledOnce(props.click);
  });

});
