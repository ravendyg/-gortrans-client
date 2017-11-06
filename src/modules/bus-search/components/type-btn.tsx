import * as React from 'react';

export interface ITypeBtnState {}

export interface ITypeBtnProps {
  emit: (code: string) => void;
  image: string;
  active: boolean;
  title: string;
}

export class TypeBtn extends React.PureComponent<ITypeBtnProps, ITypeBtnState> {
  render() {
    const
      klass = 'search__type-selector--btn' + (this.props.active ? ' active' : ''),
      {image, title} = this.props
      ;

    return(
      <div
        className={klass}
      >
        <div className={'text'}>
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
