export function getExtraData<T, I>(data: I) {
  const extras: Omit<I, keyof T> = data;
  return extras;
}
