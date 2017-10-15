import * as React from 'react';

interface ISearchState {}

interface ISearchProps {}

const style: { [name: string]: string } = {
  heigth: '100%',
  width: '100%'
};

export class Search extends React.Component<ISearchProps, ISearchState> {
  render() {
    return(
      <div className="search__wrapper" style={style}>
        sdfsdf
      </div>
    );
  }
}
