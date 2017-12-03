import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { assert } from 'chai';
import * as sinon from 'sinon';
import { Store } from 'redux';
import { IBusSearchModuleStateParticle } from 'src/modules/bus-search/types';
import { createFakeStore } from 'src/modules/bus-search/tests/fake-store';
import { TypeSelector, ITypeSelectorProps, selector } from 'src/modules/bus-search/components/type-selector';
import { TypeBtn } from 'src/modules/bus-search/components/type-btn';
import { BusCodes } from 'src/types/enums';
import { values } from 'src/services/translations';

const
  store: Store<IBusSearchModuleStateParticle> = createFakeStore(),
  props: ITypeSelectorProps = {
    store,
    getBusIcon: (code: string) => code,
    updateType: sinon.stub() as any,
  },
  comp: ShallowWrapper<ITypeSelectorProps, any> = shallow(<TypeSelector {...props} />),
  _selector = `[data-test-id="${selector}"]`
  ;

describe('<TypeSelector>', () => {

  it('renders type selector', () =>  {
    assert.equal(comp.find(_selector).length, 1);
  });

  it('renders TypeBtns', () => {
    const
      btns = comp.find(TypeBtn),
      busBtn = btns.at(0),
      tramBtn = btns.at(2)
      ;
    assert.equal(btns.length, 4);
    assert.equal(tramBtn.key(), BusCodes.TRAM);
    assert.equal(busBtn.prop('active'), true);
    assert.equal(tramBtn.prop('active'), false);
    assert.equal(tramBtn.prop('title'), values['vehicle-name-2'].ru);
    assert.equal(tramBtn.prop('image'), BusCodes.TRAM);
  });

});
