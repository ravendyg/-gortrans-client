import { IAction } from 'src/types';
import { ITranslationState } from 'src/types/state';

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
