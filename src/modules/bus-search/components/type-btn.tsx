import * as React from 'react';

export interface ITypeBtnState {}

export interface ITypeBtnProps {
  emit: () => void;
  image: string;
  active: boolean;
  title: string;
}

export const selector = 'search__type-selector--btn';

export class TypeBtn extends React.PureComponent<ITypeBtnProps, ITypeBtnState> {
  render() {
    const
      klass = selector + (this.props.active ? ' active' : ''),
      {image, title, emit} = this.props
      ;

    return(
      <div
        className={klass}
        onClick={emit}
      >
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
