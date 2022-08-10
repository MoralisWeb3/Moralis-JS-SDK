type Primitive = null | undefined | string | number | boolean | Date;

export type MoralisDataObjectValue = {
  [key: string]:
    | Primitive
    | MoralisDataObjectValue
    | Primitive[]
    | MoralisDataObjectValue[]
    | ArrayLike<Primitive>
    | ArrayLike<MoralisDataObjectValue>
    | Record<string, MoralisDataObjectValue>
    | Array<[string, MoralisDataObjectValue]>
    | [string, Primitive[]][];
};

export type MoralisDataFormatted = Primitive | MoralisDataObjectValue;
