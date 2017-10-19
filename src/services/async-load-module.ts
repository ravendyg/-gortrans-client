// TODO: Implement proper async load
export function asyncLoadModule<T>(name: string): Promise<T> {
  const res = require(name);
  return Promise.resolve(res);
}
