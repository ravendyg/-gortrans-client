import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { assert } from 'chai';
import { createStore } from 'redux';
import { createBusListReducer } from 'src/modules/bus-search/store/bus-list';
import { TypeSelector, ITypeSelectorProps, selector } from 'src/modules/bus-search/components/type-selector';

const
  store = createStore(createBusListReducer()),
  props: ITypeSelectorProps = {
    store: (store as any)
  },
  comp: ShallowWrapper = shallow(<TypeSelector {...props} />)
  ;

describe('<TypeSelector>', () => {

  it('renders type selector', () =>  {
    assert.equal(comp.find(`[data-test-id="${selector}"]`).length, 1);
  });

});
