import { assert } from 'chai';

import { lang } from 'src/store/lang';
import { TranslationActions } from 'src/types/action-types';

const
  defaultState: string = 'ru'
  ;

describe('translation reducer', () => {

  it('returns new state if an approriate action has been dispatched', () => {
    const newState = lang(defaultState, { type: TranslationActions.SET_LANGUAGE, payload: 'en' });
    assert.equal(newState, 'en');
  });

  it('returns the same state if an some other action has been dispatched', () => {
    const newState = lang(defaultState, { type: 'ranslationActions.SET_LANGUAGE', payload: 'en' } as any);
    assert.deepEqual(newState, defaultState);
  });

});
