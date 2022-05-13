import { MoralisDataObject } from '../abstract';
import { EvmAddress, EvmAddressish } from '../EvmAddress';
import { EvmChain, EvmChainish } from '../EvmChain';
import { maybe } from '../utils';

export interface Erc20Input {
  decimals: number | string;
  name: string;
  symbol: string;
  contractAddress: EvmAddressish;
  chain: EvmChainish;
  logo?: string | null;
  thumbnail?: string | null;
}

interface Erc20Data {
  decimals: number;
  name: string;
  symbol: string;
  contractAddress: EvmAddress;
  chain: EvmChain;
  logo?: string | null;
  thumbnail?: string | null;
}

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
    thumbnail: maybe(value.thumbnail),
    chain: EvmChain.create(value.chain),
  });

  equals(value: this): boolean {
    return value._value.contractAddress === this._value.contractAddress && value._value.chain.equals(this._value.chain);
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
