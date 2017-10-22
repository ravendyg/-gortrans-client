import { IAction } from '../types';
import { ITranslationState } from '../types/state';

const defaultVal: ITranslationState = {
  lang: 'ru',
  text: {
    searchInputPlaceholder: 'Номер маршрута'
  }
};

export function translation(
  state: ITranslationState = defaultVal,
  action: IAction<any, any>
): any {

  switch (action.type) {
    default: {
      return state;
    }
  }

}
