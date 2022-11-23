import Core, { MoralisDataObject, maybe, CoreProvider } from '@moralisweb3/common-core';
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
   * @param core - The MoralisCore instance
   * @example
   * ```ts
   * const token = Erc20Token.create(value);
   * ```
   */
  public static create(value: Erc20Tokenish, core?: Core) {
    if (value instanceof Erc20Token) {
      return value;
    }
    const finalCore = core ?? CoreProvider.getDefault();
    return new Erc20Token(value, finalCore);
  }

  private readonly _value: Erc20Data;

  private constructor(value: Erc20Input, core: Core) {
    this._value = Erc20Token.parse(value, core);
  }

  static parse = (value: Erc20Input, core: Core): Erc20Data => ({
    decimals: +value.decimals,
    name: value.name,
    symbol: value.symbol,
    contractAddress: EvmAddress.create(value.contractAddress, core),
    logo: maybe(value.logo),
    logoHash: maybe(value.logoHash),
    thumbnail: maybe(value.thumbnail),
    chain: EvmChain.create(value.chain, core),
  });

  /**
   * Compares two Erc20Token instances. This checks if the chain and contractAddress of both tokens are equal.
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

  /**
   * Returns the token as JSON
   *
   * @returns the Erc20Token as a JSON object
   * @example
   * ```ts
   * token.toJSON();
   * ```
   */
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
   * token.format();
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
   * @returns the decimals of the token.
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
   * @returns The name of the token.
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
   * @returns The symbol of the token.
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
   * @returns The contract address of the token.
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
   * @returns The chain of the token.
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
   * @returns The logo of the token.
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
   * @returns The logo hash of the token.
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
   * @returns The thumbnail of the token.
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
