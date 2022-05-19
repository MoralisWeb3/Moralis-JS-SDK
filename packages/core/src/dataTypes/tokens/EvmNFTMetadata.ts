import { MoralisDataObject, MoralisDataObjectValue } from '../abstract';

export interface EvmNFTMetadataInput {
  name: string;
  description: string;
  image: string;
  animation_url?: string;
  id?: string;
  attributes: MoralisDataObjectValue[];
  createdBy?: string;
  yearCreated?: string;
  media: MoralisDataObjectValue;
}

interface EvmNFTMetadataData {
  name: string;
  description: string;
  image: string;
  animation_url?: string;
  id?: string;
  attributes: MoralisDataObjectValue[];
  createdBy?: string;
  yearCreated?: string;
  media: MoralisDataObjectValue;
}

export class EvmNFTMetadata implements MoralisDataObject {
  private _value: EvmNFTMetadataData;

  constructor(value: EvmNFTMetadataInput) {
    this._value = EvmNFTMetadata.parse(value);
  }

  static create(metadata: string) {
    return new EvmNFTMetadata(JSON.parse(metadata));
  }

  static parse = (value: EvmNFTMetadataInput): EvmNFTMetadataData => ({
    ...value,
  });

  equals(value: this): boolean {
    return value._value.name === this._value.name && value._value.image === this._value.image;
  }

  toJSON() {
    const value = this._value;
    return {
      ...value,
    };
  }

  format() {
    return this.toJSON();
  }

  get result() {
    return this._value;
  }
}
