import { MoralisDataObject, MoralisDataObjectValue } from '@moralisweb3/core';
import { splitSignature, joinSignature, Signature as EthersSignature } from '@ethersproject/bytes';

interface EvmSignatureInput {
  r: string;
  s: string;
  v: number;
}

type EvmSignatureData = EthersSignature;

export type EvmSignatureish = EvmSignatureInput | EvmSignature;

export class EvmSignature implements MoralisDataObject {
  static create(data: EvmSignatureish) {
    if (data instanceof EvmSignature) {
      return data;
    }
    return new EvmSignature(data);
  }

  private _data: EvmSignatureInput;

  constructor(data: EvmSignatureInput) {
    this._data = EvmSignature.parse(data);
  }

  static parse = (data: EvmSignatureInput): EvmSignatureData => {
    return splitSignature({
      r: data.r,
      s: data.s,
      v: data.v,
    });

    // ...data,
    // v: BigNumber.create(data.v),
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
    return this.toJSON();
  }
}
