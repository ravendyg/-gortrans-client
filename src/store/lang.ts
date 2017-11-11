import { IAction } from 'src/types';
import { TranslationActions } from 'src/types/action-types';
import { assertNever } from 'src/services/assertNever';

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
      assertNever(action.type);
      return state;
    }
  }

}
