import { assert } from 'chai';

import { getTranslation } from 'src/services/translations';
import { createTranslation } from 'src/store/translation';
import { ITranslationState } from 'src/types/state';
import { TranslationActions } from 'src/types/action-types';

const
  translation = createTranslation(getTranslation),
  defaultState: ITranslationState = {
    lang: 'ru',
    translation: getTranslation('ru')
  }
  ;

describe('translation reducer', () => {

  it('returns new state if an approriate action has been dispatched', () => {
    const newState = translation(defaultState, { type: TranslationActions.SET_LANGUAGE, payload: 'en' });
    assert.equal(newState.lang, 'en');
    assert.notEqual(newState.translation, defaultState.translation);
  });

  it('returns the same state if an some other action has been dispatched', () => {
    const newState = translation(defaultState, { type: 'ranslationActions.SET_LANGUAGE', payload: 'en' } as any);
    assert.deepEqual(newState, defaultState);
  });

});
