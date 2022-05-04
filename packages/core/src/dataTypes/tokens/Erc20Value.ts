import { BigNumberish } from '@ethersproject/bignumber';
import { parseUnits } from '@ethersproject/units';
import { MoralisData } from '../abstract';

const EVM_ERC20_DEFAULT_DECIMALS = 18;

export type Erc20ValueInputAmount = BigNumberish;
export type Erc20ValueInputDecimals = number | string;
export type Erc20Valueish = Erc20ValueInputAmount | Erc20Value;

export type Erc20ValueData = {
  amount: BigNumberish;
  decimals: number;
};

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

  equals(value: this): boolean {
    return this.value.eq(value.value);
  }

  get value() {
    return parseUnits(this._value.amount.toString(), this._value.decimals);
  }

  format() {
    return this.value.toString();
  }
}
