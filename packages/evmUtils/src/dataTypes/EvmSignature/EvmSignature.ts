import { BigNumber, MoralisDataObject, MoralisDataObjectValue } from '@moralisweb3/core';
import { splitSignature, joinSignature, Signature as EthersSignature, hexlify } from '@ethersproject/bytes';
import { EvmSignatureInput } from './types';

type EvmSignatureData = EthersSignature;

export type EvmSignatureish = EvmSignatureInput | EvmSignature;

/**
 * Represents of a signed EVM signature
 * Can be created with a valid r,s,v signature or a hex string
 */
export class EvmSignature implements MoralisDataObject {
  static create(data: EvmSignatureish) {
    if (data instanceof EvmSignature) {
      return data;
    }
    return new EvmSignature(data);
  }

  private _data: EthersSignature;

  constructor(data: EvmSignatureInput) {
    this._data = EvmSignature.parse(data);
  }

  static parse = (data: EvmSignatureInput): EvmSignatureData => {
    if (typeof data === 'string') {
      return splitSignature(data);
    }

    return splitSignature({
      r: hexlify(BigNumber.create(data.r).toBigInt()),
      s: hexlify(BigNumber.create(data.s).toBigInt()),
      v: +data.v,
    });
  };

  static equals(dataA: EvmSignatureish, dataB: EvmSignatureish) {
    const signatureA = EvmSignature.create(dataA);
    const signatureB = EvmSignature.create(dataB);

    return signatureA.serialized === signatureB.serialized;
  }

  /**
   * Checks the equality of the current transfer instance with another nft transfer
   * @param data - the transfer to compare with
   * @example transaction.equals(data)
   * @returns true if the transfers are equal, false otherwise
   */
  equals(data: EvmSignatureish): boolean {
    return EvmSignature.equals(this, data);
  }

  get r() {
    return this._data.r;
  }

  get s() {
    return this._data.s;
  }

  get v() {
    return this._data.v;
  }

  get serialized(): string {
    return joinSignature(this._data);
  }

  toJSON(): MoralisDataObjectValue {
    return {
      r: this.r,
      s: this.s,
      v: this.v.toString(),
    };
  }

  format() {
    return this.serialized;
  }
}
