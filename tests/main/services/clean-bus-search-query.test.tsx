import {  } from 'mocha';
import { assert } from 'chai';
import { cleanQuery } from '../../../src/services/clean-bus-search-query';

describe('clean bus search query', () => {

  it('removes all non digits', () => {
    assert.equal(cleanQuery('7.34asd6укеа&@'), '7346');
  });

});
