import { IAction } from 'src/types';
import { TranslationActions, ITranslationActions } from 'src/types/action-types';
import { availableTranslations } from 'src/services/translations';

export function createTranslationActions(
  dispatch: (action: IAction<TranslationActions, string>) => void
): ITranslationActions {

  function setLang(lang: string): void {
    if (availableTranslations.indexOf(lang) !== -1) {
      dispatch({
        type: TranslationActions.SET_LANGUAGE,
        payload: lang
      });
    }
  }

  return {
    setLang,
  };
}
