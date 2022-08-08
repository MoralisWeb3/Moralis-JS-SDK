import { BigNumber, BigNumberish, CoreErrorCode, MoralisCoreError, MoralisData } from '@moralisweb3/core';
import { Erc20Token, Erc20Tokenish } from '../Erc20/Erc20';

const EVM_ERC20_DEFAULT_DECIMALS = 18;

export type Erc20ValueInputAmount = BigNumberish;
export type Erc20ValueInputDecimals = number | string;
export type Erc20Valueish = Erc20ValueInputAmount | Erc20Value;

export type Erc20ValueData = {
  amount: BigNumber;
  decimals: number;
};

export type Erc20Options = {
  decimals?: Erc20ValueInputDecimals;
  token?: Erc20Tokenish;
};

/**
 * The Erc20Value class is a MoralisData that references to a the value of an Erc20Token
 * It holds data about the data about the amount of tokens and the number of decimals.
 */
export class Erc20Value implements MoralisData {
  private _value: Erc20ValueData;
  private _token?: Erc20Token;

  constructor(amount: Erc20ValueInputAmount, options?: Erc20Options) {
    this._value = Erc20Value.parse({
      amount,
      decimals: options?.decimals ?? options?.token?.decimals ?? EVM_ERC20_DEFAULT_DECIMALS,
      token: options?.token,
    });

    if (options?.token) {
      this._token = Erc20Token.create(options.token);
    }
  }

  static parse = ({
    amount,
    decimals,
    token,
  }: {
    amount: Erc20ValueInputAmount;
    decimals: Erc20ValueInputDecimals;
    token?: Erc20Tokenish;
  }): Erc20ValueData => {
    if (token && token.decimals !== decimals) {
      throw new MoralisCoreError({
        code: CoreErrorCode.INVALID_DATA,
        message: 'Decimals do not match',
      });
    }

    return {
      amount: BigNumber.create(amount),
      decimals: +decimals,
    };
  };

  static create(value: Erc20Valueish, options?: Erc20Options): Erc20Value {
    if (value instanceof Erc20Value) {
      return value;
    }

    return new Erc20Value(value, options);
  }

  static equals(valueA: Erc20Valueish, valueB: Erc20Valueish): boolean {
    const erc20ValueA = Erc20Value.create(valueA);
    const erc20ValueB = Erc20Value.create(valueB);

    return erc20ValueA.value === erc20ValueB.value;
  }

  equals(value: Erc20Valueish): boolean {
    return Erc20Value.equals(this, value);
  }

  get decimals(): number {
    return this._value.decimals;
  }

  get amount(): BigNumber {
    return this._value.amount;
  }

  get value(): string {
    return this._value.amount.toDecimal(this.decimals);
  }

  get token(): Erc20Token | null {
    return this._token ?? null;
  }

  toNumber(): number {
    return +this.value;
  }

  toString(): string {
    return this.value;
  }

  display = (): string => {
    if (!this._token) {
      return `${this.value}`;
    }

    return `${this.value} ${this._token.symbol}`;
  };

  format(): string {
    return this.toString();
  }

  toJSON() {
    if (this.token) {
      return { value: this.value, token: this.token.toJSON() };
    }
    return { value: this.value };
  }
}
