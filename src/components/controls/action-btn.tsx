import * as React from 'react';

var notMobile: string = '';
if ( !navigator.userAgent.toLowerCase().match(/(android|iphone|ipad)/) ) {
  notMobile = 'not-mobile';
}

export interface IActionBtnProps {
  click: () => void;
  srcImg: any;
  offset: number;
}

export function ActionBtn(props: IActionBtnProps) {
  const style = {
    marginTop: (props.offset * 2) + 'rem'
  };
  return(
    <div className={'controls__actions--btn ' + notMobile} onClick={props.click} style={style}>
      <div>
        <img src={props.srcImg} />
      </div>
    </div>
  );
}
