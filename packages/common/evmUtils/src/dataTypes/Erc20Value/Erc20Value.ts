import { BigNumber, BigNumberish, CoreError, CoreErrorCode, MoralisData } from '@moralisweb3/common-core';
import { Erc20Token, Erc20Tokenish } from '../Erc20/Erc20';

const EVM_ERC20_DEFAULT_DECIMALS = 18;

/**
 * {@link @moralisweb3/common-core!BigNumberish} type for the amount of tokens
 */
export type Erc20ValueInputAmount = BigNumberish;

/**
 * This is a number or a string that represents the decimals of tokens
 */
export type Erc20ValueInputDecimals = number | string;

/**
 * Valid input for a new Erc20Value instance.
 * This can be an existing {@link Erc20Value} or a valid {@link Erc20ValueInputAmount} object
 */
export type Erc20Valueish = Erc20ValueInputAmount | Erc20Value;

/**
 * This is the return type of the processed Erc20Value
 */
export type Erc20ValueData = {
  amount: BigNumber;
  decimals: number;
};

/**
 * The options for the Erc20Value class
 */
export type Erc20Options = {
  decimals?: Erc20ValueInputDecimals;
  token?: Erc20Tokenish;
};

/**
 * The Erc20Value class is a MoralisData that references to a the value of an Erc20Token
 * It holds data about the data about the amount of tokens and the number of decimals.
 *
 * @category DataType
 */
export class Erc20Value implements MoralisData {
  /**
   * Create a new instance of Erc20Value from any valid input
   * @param value - The value to create
   * @param options - The options for the token
   * @example Erc20Value.create(1000, { decimals: 3 });
   * @returns The created value
   * @throws CoreError if the value is invalid
   */
  static create(value: Erc20Valueish, options?: Erc20Options): Erc20Value {
    if (value instanceof Erc20Value) {
      return value;
    }

    return new Erc20Value(value, options);
  }

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
    if (token && token.decimals && +token.decimals !== +decimals) {
      throw new CoreError({
        code: CoreErrorCode.INVALID_DATA,
        message: 'Decimals do not match',
      });
    }

    return {
      amount: BigNumber.create(amount),
      decimals: +decimals,
    };
  };

  /**
   * Compares two Erc20Valueish instances.
   * @param valueA - The first value to compare
   * @param valueB - The second value to compare
   * @returns True if the values are equal
   * @example
   * ```ts
   * const valueA = Erc20Value.create(1000, { decimals: 3 });
   * const valueB = Erc20Value.create(10000, { decimals: 4 });
   * Erc20Value.equals(valueA, valueB); // true
   * ```
   */
  static equals(valueA: Erc20Valueish, valueB: Erc20Valueish): boolean {
    const erc20ValueA = Erc20Value.create(valueA);
    const erc20ValueB = Erc20Value.create(valueB);

    return erc20ValueA.value === erc20ValueB.value;
  }

  /**
   * Compares Erc20Value with current instance.
   * @param value - The value to compare
   * @returns True if the values are equal
   * @example value.equals(valueA);
   */
  equals(value: Erc20Valueish): boolean {
    return Erc20Value.equals(this, value);
  }

  /**
   * Convert the value to a number
   * @returns the value in number format
   * @example value.toNumber();
   */
  toNumber(): number {
    return +this.value;
  }

  /**
   * Convert the value to a string
   * @returns the value in string format
   * @example value.toString();
   */
  toString(): string {
    return this.value;
  }

  /**
   * Displays the token in text format
   * @returns the value and also the token symbol if available
   * @example value.display();
   */
  display = (): string => {
    if (!this._token) {
      return `${this.value}`;
    }

    return `${this.value} ${this._token.symbol}`;
  };

  /**
   * @deprecated This method will be removed soon. To format the value, use one of the properties.
   */
  format(): string {
    return this.toString();
  }

  /**
   * Displays the token in JSON format
   * @returns the value and also the token if available
   * @example value.toJSON();
   */
  toJSON() {
    if (this.token) {
      return { value: this.value, token: this.token.toJSON() };
    }
    return { value: this.value };
  }

  /**
   * @returns the token decimals
   * @example value.decimals; // 15
   */
  get decimals(): number {
    return this._value.decimals;
  }

  /**
   * @returns the token amount
   * @example value.amount; // BigNumber
   */
  get amount(): BigNumber {
    return this._value.amount;
  }

  /**
   * @returns the token value
   * @example value.value; // "1000"
   */
  get value(): string {
    return this._value.amount.toDecimal(this.decimals);
  }

  /**
   * @returns the token
   * @example value.token; // Erc20Token
   */
  get token(): Erc20Token | null {
    return this._token ?? null;
  }
}
