// TODO import from ethers
export type Bytes = ArrayLike<number>;
export type BytesLike = Bytes | string;
export declare type AccessList = Array<{
  address: string;
  storageKeys: Array<string>;
}>;
export declare type AccessListish = AccessList | Array<[string, Array<string>]> | Record<string, Array<string>>;
