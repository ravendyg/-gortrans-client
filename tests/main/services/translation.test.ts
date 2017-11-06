import { assert } from 'chai';
import { getTranslation } from 'src/services/translations';

describe('translation service', () => {

  it('returns text if available', () => {
    assert.equal(
      getTranslation('ru')('searchInputPlaceholder'),
      'Номер маршрута'
    );
  });

  it('returns an empty string if not available', () => {
    assert.equal(
      getTranslation('ru')('smth'),
      ''
    );
  });

});
