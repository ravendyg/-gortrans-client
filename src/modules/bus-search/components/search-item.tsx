import * as React from 'react';
import { Way } from 'src/types/data-types';
import { BusCodes } from 'src/types/enums';

export interface ISearchItemProps {
  type: BusCodes;
  way: Way;
  emit: (type: BusCodes, marsh: string) => void;
}

export const selector = 'search-item';

export function SearchItem({type, way: { marsh, name, stopb, stope }, emit}: ISearchItemProps) {
  const handleOnClick = () => emit(type, marsh);

  return(
    <div
      className={'search__item'}
      data-test-id={selector}
      onClick={handleOnClick}
    >
      <div className={'search__item--number'}>
        { name }
      </div>
      <div className={'search__item--se'}>
        <div>{ stopb }</div>
        <div>{ stope }</div>
      </div>
    </div>
  );
}
