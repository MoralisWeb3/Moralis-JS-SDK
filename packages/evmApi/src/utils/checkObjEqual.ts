// eslint-disable-next-line @typescript-eslint/ban-types
export const checkObjEqual = (...objects: Object[]) =>
  objects.every((obj) => JSON.stringify(obj) === JSON.stringify(objects[0]));
