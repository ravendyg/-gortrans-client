export function stringComparator(e1: string, e2: string) {
  return e1 > e2 ?
    1 :
    e2 > e1 ?
      -1 :
      0
      ;
}
