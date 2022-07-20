import { MoralisDataObject } from '../abstract';
import { EvmAddress, EvmAddressish } from '../EvmAddress';
import { EvmChain } from '../EvmChain';
import { EvmChainish } from '../EvmChainish';
import { maybe } from '../utils';

export interface Erc20Input {
  decimals: number | string;
  name: string;
  symbol: string;
  contractAddress: EvmAddressish;
  chain: EvmChainish;
  logo?: string | null;
  logoHash?: string | null;
  thumbnail?: string | null;
}

interface Erc20Data {
  decimals: number;
  name: string;
  symbol: string;
  contractAddress: EvmAddress;
  chain: EvmChain;
  logo?: string | null;
  logoHash?: string | null;
  thumbnail?: string | null;
}

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
    decimals: maybe(value.decimals, (value) => +value),
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
