import * as React from 'react';
import { IPropsWithAction } from '../../types/action-types';
import { ActionBtn } from './action-btn';

const
  searchImg = require('../../assets/search-64.png'),
  plusImg = require('../../assets/plus-64.png'),
  minusImg = require('../../assets/minus-64.png'),
  settingsImgs = require('../../assets/cog-64.png')
  ;

interface IActionBtnsState {}
export interface IActionBtnsProps extends IPropsWithAction {}

export class ActionBtns extends React.PureComponent<IActionBtnsProps, IActionBtnsState> {

  render() {
    const btns = [{
        key: 'searchImg',
        srcImg: searchImg,
        click: this.props.actions.controlActions.showSearch,
        offset: 1
      }, {
        key: 'plusImg',
        srcImg: plusImg,
        click: this.props.actions.leafletActions.zoomIn,
        offset: 2
      }, {
        key: 'minusImg',
        srcImg: minusImg,
        click: this.props.actions.leafletActions.zoomOut,
        offset: 1
      }, {
        key: 'settingsImgs',
        srcImg: settingsImgs,
        click: this.props.actions.controlActions.showSettings,
        offset: 3
      }, ]
      ;
    return(
      <div className="control__actions">
        {
          btns.map(e => <ActionBtn {...e}/>)
        }
      </div>
    );
  }

}
