import { assert } from 'chai';
import { filterBusList } from 'src/modules/bus-search/services/filter-bus-list';
import { Way } from 'src/types/data-types';

const
  newData = (name: string): Way => ({
    name, marsh: 'm', stopb: 'b', stope: 'e',
  }),
  data: Way [] = ['1', '12', '2', '132', '312', '81'].map(name => newData(name))
  ;

describe('filterBusList', () => {

  it('matches numeric substring', () => {
    const
      names = filterBusList(data, '1'),
      names2 = filterBusList(data, '12')
      ;
    assert.deepEqual(names, [ data[0], data[1], data[3], data[4], data[5], ]);
    assert.deepEqual(names2, [ data[1], data[4], ]);
  });

  it('returns an empty array', () => {
    const names = filterBusList(data, '12312');
    assert.deepEqual(names, []);
  });

});
