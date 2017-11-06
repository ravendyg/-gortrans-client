import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import * as sinon from 'sinon';
import { assert } from 'chai';

import { selector, ITypeBtnProps, TypeBtn } from 'src/modules/bus-search/components/type-btn';

const
  props: ITypeBtnProps = {
    active: false,
    emit: sinon.stub() as any,
    image: 'image',
    title: 'title',
  },
  comp: ShallowWrapper<ITypeBtnProps, any> = shallow(<TypeBtn {...props} />)
  ;

describe('<TypeBtn/>', () => {

  it('renders an inactive component', () => {
    assert.equal(comp.find('.' + selector).length, 1);
    assert.equal(comp.prop('className'), selector);
    assert.equal(comp.find('img').at(0).prop('src'), 'image');
    assert.equal(comp.find('.title').at(0).children().text(), 'title');
  });

  it('makes it active', () => {
    comp.setProps(Object.assign({}, props, {active: true}));
    assert.equal(comp.prop('className'), selector + ' active');
  });

  it('emits on click', () => {
    const emit = (props.emit as sinon.SinonStub);
    emit.resetHistory();
    comp.simulate('click');
    sinon.assert.calledOnce(emit);
  });

});
