/* eslint-disable @typescript-eslint/ban-types */
// Source: https://github.com/kbrabrand/camelize-ts/blob/main/src/index.ts
type CamelCase<S extends string> = S extends `${infer P1}_${infer P2}${infer P3}`
  ? `${P1}${Uppercase<P2>}${CamelCase<P3>}`
  : S;

export type Camelize<T> = {
  [K in keyof T as CamelCase<string & K>]: T[K] extends Array<infer U>
    ? U extends {}
      ? Array<Camelize<U>>
      : T[K]
    : T[K] extends {}
    ? Camelize<T[K]>
    : T[K];
};

const toCamel = (value: string) => {
  return value.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace('-', '').replace('_', '');
  });
};

const isObject = function (o: object) {
  return o === Object(o) && !Array.isArray(o) && typeof o !== 'function';
};

export const toCamelCase = <Data extends object>(data: Data): Camelize<Data> => {
  if (isObject(data)) {
    const n: Record<string, unknown> = {};

    Object.keys(data).forEach((k) => {
      //@ts-ignore TODO: fix typing
      n[toCamel(k)] = toCamelCase(data[k]);
    });

    return n as Camelize<Data>;
  } else if (Array.isArray(data)) {
    //@ts-ignore TODO: difficult to type with recursive arrays
    return data.map((i) => {
      return toCamelCase(i);
    });
  }

  return data as Camelize<Data>;
};
