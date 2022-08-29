import { BigNumberFormatter } from './BigNumberFormatter';
import { BigNumberParser, BigNumberPrimitive } from './BigNumberParser';

export type BigNumberish = BigNumber | BigNumberPrimitive;

/**
 * The BigNumber class is a MoralisData that references to a the value of a BigNumber
 *
 * @category DataType
 */
export class BigNumber {
  /**
   * Create a new instance of BigNumber from any valid address input.
   *
   * @param value - the BigNumberish type
   * @example BigNumber.create(12);
   * @example BigNumber.create("20");
   * @returns a new BigNumber instance
   */
  public static create(value: BigNumberish): BigNumber {
    if (value instanceof BigNumber) {
      return value;
    }
    return new BigNumber(BigNumberParser.parseInt(value));
  }

  private constructor(private readonly value: bigint) {}

  /**
   * Creates a new BigNumber from given decimals.
   * @param value
   * @param decimals - This is optional and defaults to 0
   * @example BigNumber.fromDecimal("1.23456789", 18);
   */
  public static fromDecimal(value: BigNumberPrimitive, decimals = 0): BigNumber {
    return new BigNumber(BigNumberParser.parseDecimal(value, decimals));
  }

  /**
   * @returns the value of this BigNumber as a BigInt
   * @example BigNumber.create(12).toBigInt();
   */
  public toBigInt(): bigint {
    return this.value;
  }

  /**
   * Adds a BigNumber to current BigNumber instance.
   * @param value - the BigNumberish to add
   * @returns the result of the addition
   * @example BigNumber.create(12).add(BigNumber.create(7));
   */
  public add(value: BigNumberish): BigNumber {
    return new BigNumber(this.value + asBigInt(value));
  }

  /**
   * Subtracts a BigNumber from current BigNumber instance.
   * @param value - the BigNumberish to subtract
   * @returns the result of the subtraction
   * @example BigNumber.create(12).sub(BigNumber.create(7));
   */
  public sub(value: BigNumberish): BigNumber {
    return new BigNumber(this.value - asBigInt(value));
  }

  /**
   * Multiplies a BigNumber with current BigNumber instance.
   * @param value - the BigNumberish to multiply
   * @returns the result of the multiplication
   * @example BigNumber.create(12).mul(BigNumber.create(7));
   */
  public mul(value: BigNumberish): BigNumber {
    return new BigNumber(this.value * asBigInt(value));
  }

  /**
   * Divides a BigNumber with current BigNumber instance.
   * @param value - the BigNumberish to divide
   * @returns the result of the division
   * @example BigNumber.create(12).div(BigNumber.create(7));
   */
  public div(value: BigNumberish): BigNumber {
    return new BigNumber(this.value / asBigInt(value));
  }

  /**
   * Checks the equality of the current BigNumber with another BigNumber.
   * @param value - the BigNumberish to compare
   * @returns true if the BigNumbers are equal
   * @example BigNumber.create(12).equals(BigNumber.create(12)); // true
   */
  public equals(value: BigNumber): boolean {
    return this.value === value.toBigInt();
  }

  /**
   * Converts BigNumber instance to value in given decimals.
   * @param decimals - The decimals to convert to
   * @example BigNumber.create(12).toDecimal(18);
   */
  public toDecimal(decimals: number): string {
    return BigNumberFormatter.toDecimal(this.value, decimals);
  }

  /**
   * Converts BigNumber instance to string.
   * @example BigNumber.create(12).toString();
   */
  public toString(): string {
    return this.value.toString();
  }

  /**
   * Converts BigNumber instance to hex string.
   * @example BigNumber.create(12).toHex();
   */
  public toHex(): string {
    return BigNumberFormatter.toHex(this.value);
  }

  /**
   * Converts BigNumber instance to hex string.
   * @example BigNumber.create(12).toJSON();
   */
  public toJSON(): string {
    return this.toHex();
  }
}

function asBigInt(value: BigNumberish): bigint {
  return BigNumber.create(value).toBigInt();
}
