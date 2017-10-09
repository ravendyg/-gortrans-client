import * as React from 'react';
import {} from 'mocha';
import { assert } from 'chai';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-15';
configure({ adapter: new Adapter() });

import { ActionBtns } from '../../../src/components/controls/action-btns';
import { ActionBtn } from '../../../src/components/controls/action-btn';

describe('<ActionBtns>', () => {

  const
    props: any = {
      actions: {
        controlActions: {
          toggleSearch: () => {/**/},
          zoomIn: () => {/**/},
          zoomOut: () => {/**/}
        }
      }
    },
    btn: ShallowWrapper = shallow(<ActionBtns {...props} />)
    ;

  it('renders btns', () => {
    const len = btn.find(ActionBtn).length;
    assert.equal(len, 3);
  });

});
