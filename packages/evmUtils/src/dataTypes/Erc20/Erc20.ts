import { MoralisDataObject, maybe } from '@moralisweb3/core';
import { EvmAddress } from '../EvmAddress';
import { EvmChain } from '../EvmChain';
import { Erc20Input, Erc20Data } from './types';

/**
 * This can be any valid {@link Erc20Input} or {@link Erc20Token}.
 */
export type Erc20Tokenish = Erc20Input | Erc20Token;

/**
 * The Erc20Token class is a MoralisData that references to a Erc20 Token
 * It holds data about the data and metadata of an Erc20 token
 *
 * @category DataType
 */
export class Erc20Token implements MoralisDataObject {
  /**
   *  Create a new instance of Erc20Token from any valid Erc20Token input
   *
   * @param value - the Erc20Tokenish type
   * @example
   * ```ts
   * const token = Erc20Token.create(value);
   * ```
   */
  static create(value: Erc20Tokenish) {
    if (value instanceof Erc20Token) {
      return value;
    }

    return new Erc20Token(value);
  }

  private _value: Erc20Data;

  constructor(value: Erc20Input) {
    this._value = Erc20Token.parse(value);
  }

  static parse = (value: Erc20Input): Erc20Data => ({
    decimals: +value.decimals,
    name: value.name,
    symbol: value.symbol,
    contractAddress: EvmAddress.create(value.contractAddress),
    logo: maybe(value.logo),
    logoHash: maybe(value.logoHash),
    thumbnail: maybe(value.thumbnail),
    chain: EvmChain.create(value.chain),
  });

  /**
   * Compares two Erc20Token instances
   *
   * @param valueA - the first Erc20Token to compare
   * @param valueB - the second Erc20Token to compare
   * @returns true if the two Erc20Tokens are equal
   * @example
   * ```ts
   * Erc20Token.equals(valueA, valueB);
   * ```
   */
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

  /**
   * Compares Erc20Token instance to current instance
   *
   * @param value - the Erc20Tokenish to compare
   * @returns true if the Erc20Token is equals given token
   * @example
   * ```ts
   * token.equals(value);
   * ```
   */
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

  /**
   * Returns the token as JSON
   *
   * @returns the Erc20Token as a JSON object
   * @example
   * ```ts
   * token.toJSON();
   * ```
   */
  format() {
    return this.toJSON();
  }

  /**
   * Returns the processed Erc20Token.
   *
   * @returns the Erc20Token value
   * @example
   * ```ts
   * token.result;
   *  ```
   */
  get result() {
    return this._value;
  }

  /**
   * Returns the decimals of the token.
   *
   * @example
   * ```ts
   * token.decimals;
   * ```
   */
  get decimals() {
    return this._value.decimals;
  }

  /**
   * Returns the name of the token.
   *
   * @example
   * ```ts
   * token.name;
   * ```
   */
  get name() {
    return this._value.name;
  }

  /**
   * Returns the symbol of the token.
   *
   * @example
   * ```ts
   * token.symbol;
   * ```
   */
  get symbol() {
    return this._value.symbol;
  }

  /**
   * Returns the contract address of the token.
   *
   * @example
   * ```ts
   * token.contractAddress;
   * ```
   */
  get contractAddress() {
    return this._value.contractAddress;
  }

  /**
   * Returns the chain of the token.
   *
   * @example
   * ```ts
   * token.chain;
   * ```
   */
  get chain() {
    return this._value.chain;
  }

  /**
   * Returns the logo of the token.
   *
   * @example
   * ```ts
   * token.logo;
   * ```
   */
  get logo() {
    return this._value.logo;
  }

  /**
   * Returns the logo hash of the token.
   *
   * @example
   * ```ts
   * token.logoHash;
   * ```
   */
  get logoHash() {
    return this._value.logoHash;
  }

  /**
   * Returns the thumbnail of the token.
   *
   * @example
   * ```ts
   * token.thumbnail;
   * ```
   */
  get thumbnail() {
    return this._value.thumbnail;
  }
}
