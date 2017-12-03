import * as React from 'react';
import { assert } from 'chai';
import { shallow, ShallowWrapper } from 'enzyme';
import { Store } from 'redux';
import { createFakeStore } from 'src/modules/bus-search/tests/fake-store';
import { Search, ISearchProps, selector } from 'src/modules/bus-search/components/search';
import { TypeSelector } from 'src/modules/bus-search/components/type-selector';
import { SearchInput } from 'src/modules/bus-search/components/search-input';
import { createBusSearchActions } from 'src/modules/bus-search/actions/bus-search';
import { createBusListActions } from 'src/modules/bus-search/actions/bus-list';
import { BusCodes } from 'src/types/enums';
import { SearchItem } from 'src/modules/bus-search/components/search-item';

const
  _selector = `[data-test-id="${selector}"]`,
  store: Store<any> = createFakeStore(),
  props: ISearchProps = {
    store,
    busListAction: createBusListActions(store.dispatch),
    busSearchActions: createBusSearchActions(store.dispatch),
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

  it('renders search history, if no query has been entered', () => {
    props.busSearchActions.updateAllHistory({
      activeTab: BusCodes.BUS,
      lists: {
        '0': [{
          marsh: 'marsh',
          name: 'name',
          stopb: 'stopb',
          stope: 'stope',
        }]
      }
    });

    comp.update();

    const items = comp.find(SearchItem);
    assert.equal(items.length, 1);
  });

});
