/* eslint-disable @typescript-eslint/ban-types */
// Source: https://github.com/kbrabrand/camelize-ts/blob/main/src/index.ts
type CamelCase<Input extends string> = Input extends `${infer P1}_${infer P2}${infer P3}`
  ? `${P1}${Uppercase<P2>}${CamelCase<P3>}`
  : Input;

export type Camelize<Data> = {
  [Key in keyof Data as CamelCase<string & Key>]: Data[Key] extends Array<infer Value>
    ? Value extends {}
      ? Array<Camelize<Value>>
      : Data[Key]
    : Data[Key] extends {}
    ? Camelize<Data[Key]>
    : Data[Key];
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
      // @ts-ignore TODO: fix typing
      n[toCamel(k)] = toCamelCase(data[k]);
    });

    return n as Camelize<Data>;
  }

  if (Array.isArray(data)) {
    // @ts-ignore TODO: difficult to type with recursive arrays
    return data.map((i) => {
      return toCamelCase(i);
    });
  }

  return data as Camelize<Data>;
};
