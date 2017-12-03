import { assert } from 'chai';
import { stringComparator } from 'src/services/comparators';

describe('comarator services', () => {

  describe('string comparator', () => {

    it('compare non negative numbers', () => {
      assert.equal(stringComparator('0', '1'), -1);
      assert.equal(stringComparator('2', '1'), 1);
      assert.equal(stringComparator('7', '7'), 0);
    });

  });

});
