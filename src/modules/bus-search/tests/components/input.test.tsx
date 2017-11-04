import * as React from 'react';
import * as sinon from 'sinon';
import {} from 'mocha';
import { shallow, ShallowWrapper } from 'enzyme';

import { storeFactory } from 'tests/fake-store';
import { SearchInput, inputClassName } from 'src/modules/bus-search/components/input';

const
  store = storeFactory(),
  props: any = {
    emit: sinon.stub(),
    store
  },
  comp: ShallowWrapper = shallow(<SearchInput {...props} />)
  ;

describe('<SearchInput>', () => {

  it('onChnage calls props.emit', () =>  {
    const ev: any = {
      target: {
        value: '12'
      }
    };
    comp.find('.' + inputClassName).at(0).simulate('change', ev);
    sinon.assert.calledWith(props.emit, '12');
  });


});
