import { IAction } from 'src/types';
import { TranslationActions } from 'src/types/action-types';

// TODO: remember the value
export function lang(
  state: string = 'ru',
  action: IAction<TranslationActions, string>
): string {

  switch (action.type) {
    case TranslationActions.SET_LANGUAGE: {
      return action.payload;
    }

    default: {
      return state;
    }
  }

}
