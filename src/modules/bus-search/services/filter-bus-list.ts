import { Way } from 'src/types/data-types';

export function filterBusList(ways: Way [], query: string, ) {
  const reg = new RegExp(query);
  return ways.filter(way => reg.test(way.name));
}
