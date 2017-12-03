import { TranslationActions } from 'src/types/action-types';
import { assertNever } from 'src/services/assertNever';
import { TranslationActionTypes } from 'src/actions/translations';

// TODO: remember the value
export function lang(
  state: string = 'ru',
  action: TranslationActionTypes
): string {

  let newState = state;

  switch (action.type) {
    case TranslationActions.SET_LANGUAGE: {
      newState = action.payload;
      break;
    }

    default: {
      assertNever(action.type);
    }
  }

  return newState;
}
