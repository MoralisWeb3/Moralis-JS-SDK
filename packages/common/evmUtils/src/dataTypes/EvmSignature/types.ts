export type EvmSignatureInputRSV = {
  // The x co-ordinate of r value of the signature
  r: string;
  // The x co-ordinate of s value of the signature
  s: string;
  // The parity of the y co-ordinate of r
  v: number | string;
};

export type EvmSignatureInput = EvmSignatureInputRSV | string;
