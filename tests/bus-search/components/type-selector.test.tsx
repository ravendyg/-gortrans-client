import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { assert } from 'chai';
import { createStore, combineReducers, Reducer, Store } from 'redux';
import { IBusSearchModuleStateParticle } from 'src/modules/bus-search/types';
import { createBusListReducer } from 'src/modules/bus-search/store/bus-list';
import { createBusSearchReducer } from 'src/modules/bus-search/store/bus-search';
import { IConfig } from 'src/types';
import { TypeSelector, ITypeSelectorProps, selector } from 'src/modules/bus-search/components/type-selector';

const
  store: Store<IBusSearchModuleStateParticle> = createStore(
    combineReducers({
      busList: createBusListReducer(),
      busSearch: createBusSearchReducer({historyDisplayLimit: 2} as IConfig),
    }) as Reducer<any>
  ),
  props: ITypeSelectorProps = {
    store
  },
  comp: ShallowWrapper<ITypeSelectorProps, any> = shallow(<TypeSelector {...props} />)
  ;

describe('<TypeSelector>', () => {

  it('renders type selector', () =>  {
    assert.equal(comp.find(`[data-test-id="${selector}"]`).length, 1);
  });

});
