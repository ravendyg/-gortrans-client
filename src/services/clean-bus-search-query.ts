export function cleanQuery(query: string): string {
  return query.replace(/[^0-9]/g, '');
}
