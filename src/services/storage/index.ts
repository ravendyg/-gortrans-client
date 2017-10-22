/**
 * @throws Error('bad entry')
 */
export function verifyStorageEntry(entry: any): void {
  if (!entry || typeof entry !== 'object') {
    throw new Error('bad entry');
  }
}

export function getAsync<T>(storage: Storage, key: string, getDefault: () => T): Promise<T> {
  let res: T;
  try {
    const resStr = storage.getItem(key) || '';
    res = JSON.parse(resStr);
    verifyStorageEntry(res);
  } catch (err) {
    res = getDefault();
  }
  return Promise.resolve(res);
}
