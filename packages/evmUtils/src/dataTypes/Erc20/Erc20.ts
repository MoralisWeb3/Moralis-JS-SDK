import { MoralisDataObject, maybe } from '@moralisweb3/core';
import { EvmAddress } from '../EvmAddress';
import { EvmChain } from '../EvmChain';
import { Erc20Input, Erc20Data } from './types';

export type Erc20Tokenish = Erc20Input | Erc20Token;

/**
 * The Erc20Token class is a MoralisData that references to a Erc20 Token
 * It holds data about the data and metadata of an Erc20 token
 */
export class Erc20Token implements MoralisDataObject {
  private _value: Erc20Data;

  constructor(value: Erc20Input) {
    this._value = Erc20Token.parse(value);
  }

  static parse = (value: Erc20Input): Erc20Data => ({
    decimals: maybe(value.decimals, (decimals) => +decimals),
    name: value.name,
    symbol: value.symbol,
    contractAddress: EvmAddress.create(value.contractAddress),
    logo: maybe(value.logo),
    logoHash: maybe(value.logoHash),
    thumbnail: maybe(value.thumbnail),
    chain: EvmChain.create(value.chain),
  });

  static create(value: Erc20Tokenish) {
    if (value instanceof Erc20Token) {
      return value;
    }

    return new Erc20Token(value);
  }

  static equals(valueA: Erc20Tokenish, valueB: Erc20Tokenish) {
    const erc20A = Erc20Token.create(valueA);
    const erc20B = Erc20Token.create(valueB);

    if (!erc20A._value.chain.equals(erc20B._value.chain)) {
      return false;
    }

    if (!erc20A._value.contractAddress.equals(erc20B._value.contractAddress)) {
      return false;
    }

    return true;
  }

  get decimals() {
    return this._value.decimals;
  }

  get name() {
    return this._value.name;
  }

  get symbol() {
    return this._value.symbol;
  }

  get contractAddress() {
    return this._value.contractAddress;
  }

  get chain() {
    return this._value.chain;
  }

  get logo() {
    return this._value.logo;
  }

  get logoHash() {
    return this._value.logoHash;
  }

  get thumbnail() {
    return this._value.thumbnail;
  }

  equals(value: Erc20Tokenish): boolean {
    return Erc20Token.equals(this, value);
  }

  toJSON() {
    const value = this._value;
    return {
      ...value,
      contractAddress: value.contractAddress.format(),
      chain: value.chain.format(),
    };
  }

  format() {
    return this.toJSON();
  }

  get result() {
    return this._value;
  }
}
