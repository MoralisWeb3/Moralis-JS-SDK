type Primitive = null | undefined | string | number | boolean | Date;

export type MoralisDataObjectValue =
  | {
      [key: string]:
        | Primitive
        | MoralisDataObjectValue
        | Primitive[]
        | (Primitive | Primitive[])[]
        | MoralisDataObjectValue[]
        | ArrayLike<Primitive>
        | ArrayLike<MoralisDataObjectValue>
        | Record<string, MoralisDataObjectValue>
        | Array<[string, MoralisDataObjectValue]>
        | [string, Primitive[]][];
    }
  | MoralisDataObjectValue[];

export type MoralisDataFormatted = Primitive | MoralisDataObjectValue;
