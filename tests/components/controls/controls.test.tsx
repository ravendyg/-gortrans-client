import * as React from 'react';
import {} from 'mocha';
import { assert } from 'chai';
import * as sinon from 'sinon';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-15';
configure({ adapter: new Adapter() });

import { Controls } from '../../../src/components/controls/controls';
import { ActionBtns } from '../../../src/components/controls/action-btns';
import { IControlAction } from '../../../src/types/action-types';

describe('<Controls>', () => {

  const
    actions: {controlActions: IControlAction} = {
      controlActions: {
        toggleSearch: sinon.stub(),
      }
    },
    props: {actions: any} = {
      actions
    },
    comp: ShallowWrapper = shallow(<Controls {...props} />)
    ;

  it('renders action btns', () => {
    const btns: ShallowWrapper = comp.find(ActionBtns);
    assert.equal(btns.length, 1);
    assert.equal(btns.prop('actions'), actions);
  });

});
