import * as React from 'react';
import * as sinon from 'sinon';
import { assert } from 'chai';
import { shallow, ShallowWrapper } from 'enzyme';

// import { storeFactory } from 'tests/fake-store';
import { Store } from 'redux';
import { createFakeStore } from 'src/modules/bus-search/tests/fake-store';
import { SearchInput, inputClassName } from 'src/modules/bus-search/components/input';
import { values } from 'src/services/translations';

const
  // store = storeFactory(),
  store: Store<any> = createFakeStore(),
  props: any = {
    emit: sinon.stub(),
    store
  },
  comp: ShallowWrapper = shallow(<SearchInput {...props} />)
  ;

describe('<SearchInput>', () => {

  it('onChange calls props.emit', () =>  {
    const ev: any = {
      target: {
        value: '12'
      }
    };
    comp.find('.' + inputClassName).at(0).simulate('change', ev);
    sinon.assert.calledWith(props.emit, '12');
  });

  it('displays correct placeholder', () => {
    const input = comp.find('input').at(0);
    assert.equal(input.prop('placeholder'), values.searchInputPlaceholder.ru);
  });


});
