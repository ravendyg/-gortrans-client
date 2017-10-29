import * as React from 'react';
import {} from 'mocha';
import { assert } from 'chai';
import { shallow, ShallowWrapper } from 'enzyme';

import { ActionBtns } from '../../../../src/components/controls/action-btns';
import { ActionBtn } from '../../../../src/components/controls/action-btn';

describe('<ActionBtns>', () => {

  const
    props: any = {
      actions: {
        controlActions: {
          goToRoot: () => {/**/},
          showSearch: () => {/**/},
          showSettings: () => {/**/},
        },
        leafletActions: {
          zoomIn: () => {/**/},
          zoomOut: () => {/**/},
        },
      }
    },
    btn: ShallowWrapper = shallow(<ActionBtns {...props} />)
    ;

  it('renders btns', () => {
    const len = btn.find(ActionBtn).length;
    assert.equal(len, 4);
  });

});
