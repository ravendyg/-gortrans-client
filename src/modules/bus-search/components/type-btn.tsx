import * as React from 'react';

export interface ITypeBtnState {}

export interface ITypeBtnProps {
  emit: () => void;
  image: string;
  active: boolean;
  title: string;
}

export const selector = 'search-type-btn';

export class TypeBtn extends React.PureComponent<ITypeBtnProps, ITypeBtnState> {
  render() {
    const
      {image, title, emit, active} = this.props,
      className = 'search__type-selector--btn' + (active ? ' active' : '')
      ;
    let
      rootProps: any = {
        className,
        'data-test-id': selector
      }
      ;
    if (!active) {
      rootProps.onClick = emit;
    }

    return(
      <div {...rootProps}>
        <div className={'title'}>
          {title}
        </div>
        <img
          src={image}
        />
        <div className={'bar'}>
        </div>
      </div>
    );
  }
}
