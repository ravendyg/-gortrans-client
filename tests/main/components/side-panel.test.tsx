import * as React from 'react';
import {} from 'mocha';
import * as sinon from 'sinon';
import { assert } from 'chai';
import { configure, mount, ReactWrapper, shallow, ShallowWrapper } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-15';
configure({ adapter: new Adapter() });

import { SidePanel, overlayClass } from '../../../src/components/side-panel';
import { createFakeWindow } from '../../fake-window';

const
  panelProps: any = {
    closeMe: sinon.stub(),
    slideLength: '0.001s',
    win: createFakeWindow(),
  }
  ;

describe('Side panel component', () => {

  beforeEach(() => {
    panelProps.win = createFakeWindow();
  });

  it('render the children component', () => {
    const
      comp: ShallowWrapper = shallow(
        <SidePanel {...panelProps}>
          <div className="test"></div>
        </SidePanel>
      ),
      child: ShallowWrapper = comp.find('.test')
      ;
    assert.equal(child.length, 1);
  });

  it('changes it\'s state after mounting to slide on to the screen', done => {
    const
      comp: ReactWrapper = mount(
        <SidePanel {...panelProps}>
          <div className="test"></div>
        </SidePanel>
      )
      ;

    assert.equal(comp.state('transform'), 'translate(-100%, 0)');
    setTimeout(() => {
      try {
        assert.equal(comp.state('transform'), 'translate(0, 0)');
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  it('slides panel away and calls props.closeMe, when overlay clicked', done => {
    panelProps.closeMe.resetHistory();

    const
      comp: ShallowWrapper = shallow(
        <SidePanel {...panelProps}>
          <div className="test"></div>
        </SidePanel>
      ),
      overlay: ShallowWrapper = comp.find('.' + overlayClass),
      event = {
        target: {
          getAttribute() {
            return overlayClass;
          }
        }
      }
      ;

    overlay.simulate('click', event);

    assert.equal(comp.state('transform'), 'translate(-100%, 0)');
    setTimeout(() => {
      try {
        sinon.assert.calledOnce(panelProps.closeMe);
        done();
      } catch (err) {
        done(err);
      }
    }, 5);

  });

  it('ignores clicks on the content', done => {
    panelProps.closeMe.resetHistory();

    const
      comp: ShallowWrapper = shallow(
        <SidePanel {...panelProps}>
          <div className="test"></div>
        </SidePanel>
      ),
      overlay: ShallowWrapper = comp.find('.' + overlayClass),
      event = {
        target: {
          getAttribute() {
            return 'not overlay class';
          }
        }
      }
      ;

    overlay.simulate('click', event);

    assert.equal(comp.state('transform'), 'translate(-100%, 0)');
    setTimeout(() => {
      try {
        sinon.assert.notCalled(panelProps.closeMe);
        done();
      } catch (err) {
        done(err);
      }
    }, 5);

  });

  it('registers and unregisters onKeyup event listener', () => {
    const
      addSpy = sinon.spy(panelProps.win.document, 'addEventListener'),
      removeSpy = sinon.spy(panelProps.win.document, 'removeEventListener'),
      comp: ReactWrapper = mount(
        <SidePanel {...panelProps}>
          <div className="test"></div>
        </SidePanel>
      )
      ;

    comp.unmount();

    sinon.assert.calledWith(addSpy, 'keyup');
    sinon.assert.calledWith(removeSpy, 'keyup');
  });

  it('slides panel away and calls props.closeMe, when Esc pressed and released', done => {
    panelProps.closeMe.resetHistory();

    const
      comp: ShallowWrapper = shallow(
        <SidePanel {...panelProps}>
          <div className="test"></div>
        </SidePanel>
      )
      ;

    panelProps.win.document.simulate('keyup', {
      key: 'Escape'
    });

    assert.equal(comp.state('transform'), 'translate(-100%, 0)');
    setTimeout(() => {
      try {
        sinon.assert.calledOnce(panelProps.closeMe);
        done();
      } catch (err) {
        done(err);
      }
    }, 5);

  });

});
