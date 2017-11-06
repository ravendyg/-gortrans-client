import * as sinon from 'sinon';

import { createTranslationActions } from 'src/actions/translations';
import { TranslationActions } from 'src/types/action-types';
import { availableTranslations } from 'src/services/translations';

const
  dispatch: any = sinon.stub(),
  {setLang} = createTranslationActions(dispatch)
  ;

describe('translation actions', () => {

  beforeEach(() => {
    dispatch.resetHistory();
  });

  it('dispatches when correct language provided', () => {
    setLang(availableTranslations[1]);
    sinon.assert.calledWith(dispatch, sinon.match({
      type: TranslationActions.SET_LANGUAGE,
      payload: availableTranslations[1],
    }));
  });

  it('does not dispatch when incorrect language provided', () => {
    setLang('fr');
    sinon.assert.notCalled(dispatch);
  });

});
