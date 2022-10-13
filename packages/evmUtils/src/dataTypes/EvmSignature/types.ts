import { BigNumberish } from '@moralisweb3/core';

type EvmSignatureInputRSV = {
  // The x co-ordinate of r value of the signature
  r: BigNumberish;
  // The x co-ordinate of s value of the signature
  s: BigNumberish;
  // The parity of the y co-ordinate of r
  v: number | string;
};

export type EvmSignatureInput = EvmSignatureInputRSV | string;
