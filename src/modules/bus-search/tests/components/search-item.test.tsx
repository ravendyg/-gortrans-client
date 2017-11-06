import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import * as sinon from 'sinon';
import { assert } from 'chai';
import { BusCodes } from 'src/types/enums';

import { selector, ISearchItemProps, SearchItem } from 'src/modules/bus-search/components/search-item';

const
  _selector = `[data-test-id="${selector}"]`,
  props: ISearchItemProps = {
    emit: sinon.stub() as any,
    type: BusCodes.TRAM,
    way: {
      marsh: 'marsh',
      name: 'name',
      stopb: 'stopb',
      stope: 'stope',
    }
  },
  comp: ShallowWrapper<ISearchItemProps, any> = shallow(<SearchItem {...props} />)
  ;

describe('<SearchItem/>', () => {

  it('renders an item', () => {
    assert.equal(comp.find(_selector).length, 1);
  });

  it('emits on click', () => {
    const emit = (props.emit as sinon.SinonStub);
    emit.resetHistory();
    comp.simulate('click');
    sinon.assert.calledWith(emit, BusCodes.TRAM, 'marsh');
  });

});
