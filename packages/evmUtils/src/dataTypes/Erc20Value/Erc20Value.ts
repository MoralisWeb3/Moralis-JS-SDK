import { BigNumber, BigNumberish, MoralisData } from '@moralisweb3/core';

const EVM_ERC20_DEFAULT_DECIMALS = 18;

export type Erc20ValueInputAmount = BigNumberish;
export type Erc20ValueInputDecimals = number | string;
export type Erc20Valueish = Erc20ValueInputAmount | Erc20Value;

export type Erc20ValueData = {
  amount: BigNumberish;
  decimals: number;
};

/**
 * The Erc20Value class is a MoralisData that references to a the value of an Erc20Token
 * It holds data about the data about the amount of tokens and the number of decimals.
 */
export class Erc20Value implements MoralisData {
  private _value: Erc20ValueData;

  constructor(amount: Erc20ValueInputAmount, decimals: Erc20ValueInputDecimals = EVM_ERC20_DEFAULT_DECIMALS) {
    this._value = Erc20Value.parse({
      amount,
      decimals,
    });
  }

  static parse = (value: { amount: Erc20ValueInputAmount; decimals: Erc20ValueInputDecimals }): Erc20ValueData => ({
    amount: value.amount,
    decimals: +value.decimals,
  });

  static create(value: Erc20Valueish, decimals?: Erc20ValueInputDecimals) {
    if (value instanceof Erc20Value) {
      return value;
    }

    return new Erc20Value(value, decimals);
  }

  static equals(valueA: Erc20Valueish, valueB: Erc20Valueish) {
    const erc20ValueA = Erc20Value.create(valueA);
    const erc20ValueB = Erc20Value.create(valueB);

    return erc20ValueA.value.equals(erc20ValueB.value);
  }

  equals(value: Erc20Valueish): boolean {
    return Erc20Value.equals(this, value);
  }

  get decimals() {
    return this._value.decimals;
  }

  get amount() {
    return this._value.amount;
  }

  get value() {
    return BigNumber.fromDecimal(this._value.amount.toString(), this._value.decimals);
  }

  toString() {
    return this.value.toString();
  }

  format() {
    return this.toString();
  }
}
