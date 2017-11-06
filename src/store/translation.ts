import { IAction } from 'src/types';
import { TranslationActions } from 'src/types/action-types';
import { ITranslationState } from 'src/types/state';

// TODO: remember the value
export function createTranslation(getTranslation: (lang: string) => (key: string) => string) {
  return function translation(
    state: ITranslationState = {
      lang: 'ru', translation: getTranslation('ru')
    },
    action: IAction<TranslationActions, string>
  ): ITranslationState {

    switch (action.type) {
      case TranslationActions.SET_LANGUAGE: {
        return {
          lang: action.payload,
          translation: getTranslation(action.payload),
        };
      }

      default: {
        return state;
      }
    }

  };
}
