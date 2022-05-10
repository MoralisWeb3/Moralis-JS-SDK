export function formatClass<T, I>(parent: any, data: I) {
  const main = new parent(data);
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      if (main.result[key]) {
        delete data[key];
      }
    }
  }
  return { main: main as T, extras: data as Partial<I> };
}
