import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { assert } from 'chai';
import { createStore, combineReducers, Reducer, Store } from 'redux';
import { IBusSearchModuleStateParticle } from 'src/modules/bus-search/types';
import { createBusListReducer } from 'src/modules/bus-search/store/bus-list';
import { createBusSearchReducer } from 'src/modules/bus-search/store/bus-search';
import { IConfig } from 'src/types';
import { TypeSelector, ITypeSelectorProps, selector } from 'src/modules/bus-search/components/type-selector';
import { TypeBtn } from 'src/modules/bus-search/components/type-btn';
import { BusCodes } from 'src/types/enums';
import { getTranslation } from 'src/services/translations';
import { createTranslation } from 'src/store/translation';

const
  store: Store<IBusSearchModuleStateParticle> = createStore(
    combineReducers({
      busList: createBusListReducer(),
      busSearch: createBusSearchReducer({historyDisplayLimit: 2} as IConfig),
      translation: createTranslation(getTranslation),
    }) as Reducer<any>
  ),
  props: ITypeSelectorProps = {
    store,
    getBusIcon: (code: string) => code,
  },
  comp: ShallowWrapper<ITypeSelectorProps, any> = shallow(<TypeSelector {...props} />)
  ;

describe('<TypeSelector>', () => {

  it('renders type selector', () =>  {
    assert.equal(comp.find(`[data-test-id="${selector}"]`).length, 1);
  });

  it('renders TypeBtns', () => {
    const
      btns = comp.find(TypeBtn),
      busBtn = btns.at(0),
      tramBtn = btns.at(2)
      ;
    assert.equal(btns.length, Object.keys(BusCodes).length);
    assert.equal(tramBtn.key(), BusCodes.TRAM);
    assert.equal(busBtn.prop('active'), true);
    assert.equal(tramBtn.prop('active'), false);
    assert.equal(tramBtn.prop('image'), BusCodes.TRAM);
  });

});
