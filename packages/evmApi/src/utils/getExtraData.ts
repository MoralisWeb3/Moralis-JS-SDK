export function getExtraData<T, I>(dataType: any, data: I) {
    let extras = {};
    (Object.keys(data) as Array<keyof Omit<I, keyof T>>).forEach((key) => {
      if (dataType[key] == undefined) {
        extras = { ...extras, [key]: data[key] };
      }
    });
    return extras as Omit<I, keyof T>;
  }
  