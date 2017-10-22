import * as React from 'react';
import * as sinon from 'sinon';
import {} from 'mocha';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-15';
configure({ adapter: new Adapter() });

import { storeFactory } from '../../../fake-store';
import { SearchInput, inputClassName } from '../../../../src/modules/bus-search/components/input';

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
