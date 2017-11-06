import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import * as sinon from 'sinon';
import { assert } from 'chai';



// import { createStore, combineReducers, Reducer, Store } from 'redux';
// import { IBusSearchModuleStateParticle } from 'src/modules/bus-search/types';
// import { createBusListReducer } from 'src/modules/bus-search/store/bus-list';
// import { createBusSearchReducer } from 'src/modules/bus-search/store/bus-search';
// import { IConfig } from 'src/types';
// import { TypeSelector, ITypeSelectorProps, selector } from 'src/modules/bus-search/components/type-selector';
// import { TypeBtn } from 'src/modules/bus-search/components/type-btn';
// import { BusCodes } from 'src/types/enums';
// import { getTranslation } from 'src/services/translations';
// import { createTranslation } from 'src/store/translation';

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
