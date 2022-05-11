export function getExtraData<T, I>(data: I) {
  let extras = {};
  (Object.keys(data) as Array<keyof Omit<I, keyof T>>).forEach((key) => {
    if (data[key]) {
      extras = { ...extras, [key]: data[key] };
    }
  });
  return extras as Omit<I, keyof T>;
}
