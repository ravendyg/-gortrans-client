import * as React from 'react';
import * as sinon from 'sinon';
import { assert } from 'chai';
import { shallow, ShallowWrapper } from 'enzyme';
import { Store } from 'redux';
import { createFakeStore } from 'src/modules/bus-search/tests/fake-store';
import { Search, ISearchProps, selector } from 'src/modules/bus-search/components/search';
import { TypeSelector } from 'src/modules/bus-search/components/type-selector';
import { SearchInput } from 'src/modules/bus-search/components/input';

const
  _selector = `[data-test-id="${selector}"]`,
  store: Store<any> = createFakeStore(),
  props: ISearchProps = {
    store,
    busListAction: {
      updateBusList: sinon.stub() as any,
      updateQuery: sinon.stub() as any,
    },
    busSearchActions: {
      updateType: sinon.stub() as any,
      updateAllHistory: sinon.stub() as any,
      updateHistory: sinon.stub() as any,
    },
    getBusIcon: () => 'icon',
  },
  comp: ShallowWrapper = shallow(<Search {...props} />)
;

describe('<Search />', () => {

  it('renders component', () => {
    assert.equal(comp.find(_selector).length, 1);
  });

  it('renders <TypeSelector/>', () => {
    const
      typeSelectorComp = comp.find(TypeSelector).at(0),
      _props = typeSelectorComp.props()
      ;
    assert.equal(_props.store, store);
    assert.equal(_props.getBusIcon, props.getBusIcon);
    assert.equal(_props.updateType, props.busSearchActions.updateType);
  });

  it('renders <SearchInput/>', () => {
    const
      typeSelectorComp = comp.find(SearchInput).at(0),
      _props = typeSelectorComp.props()
      ;
    assert.equal(_props.store, store);
    assert.equal(_props.emit, props.busListAction.updateQuery);
  });

});
