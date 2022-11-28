import {
  MoralisData,
  MoralisDataFormatted,
  CoreErrorCode,
  CoreError,
  BigNumberish,
  BigNumber,
} from '@moralisweb3/common-core';

/**
 * Type containing valid Solana native units
 */
export type SolNativeUnit = 'solana' | 'lamports' | number;

/**
 * Valid input for a new SolNative instance.
 * This can be an existing {@link SolNative} or a valid {@link @moralisweb3/core!BigNumberish} type
 */
export type SolNativeish = SolNative | BigNumberish;

const unitToDecimals: Record<SolNativeUnit, number> = {
  solana: 9,
  lamports: 0,
};

/**
 * The SolNative class is a MoralisData that references to the value of Solana native currency SOL
 *
 * @category DataType
 */
export class SolNative implements MoralisData {
  /**
   * Create a new instance of SolNative from any valid {@link SolNativeish} value.
   * @param value - the value to create the SolNative from
   * @param unit - the unit of the value (optional), defaults to `solana`
   * @returns a new instance of SolNative
   * @example
   * ```ts
   * const native = SolNative.create(2, 'lamports');
   * const native = SolNative.create(2);
   *```
   */
  public static create(value: SolNativeish, unit?: SolNativeUnit): SolNative {
    if (value instanceof SolNative) {
      return value;
    }
    return new SolNative(SolNative.parse(value, unit));
  }

  private static parse(value: BigNumberish, unit: SolNativeUnit = 'solana'): BigNumber {
    let decimal: number;
    if (typeof unit === 'number') {
      decimal = unit;
    } else if (unitToDecimals[unit] !== undefined) {
      decimal = unitToDecimals[unit];
    } else {
      throw new CoreError({
        code: CoreErrorCode.INVALID_ARGUMENT,
        message: `Not supported Solana unit: ${unit}`,
      });
    }
    return BigNumber.fromDecimal(value.toString(), decimal);
  }

  private constructor(private readonly rawValue: BigNumber) {}

  /**
   * Compares two SolNativeish values.
   * @param valueA - the first value to compare
   * @param valueB - the second value to compare
   * @returns true if the values are equal
   * @example
   * ```ts
   * SolNative.equals(SolNative.create(1), SolNative.create(1)); // true
   * ```
   */
  public static equals(valueA: SolNativeish, valueB: SolNativeish): boolean {
    const solNativeA = SolNative.create(valueA);
    const solNativeB = SolNative.create(valueB);

    return solNativeA.lamports === solNativeB.lamports;
  }

  /**
   * Compares SolNative with current instance.
   * @param value - the value to compare with
   * @returns true if the values are equal
   * @example
   * ```ts
   * const native = SolNative.create(2, 'lamports');
   * native.equals(SolNative.create(1)); // false
   * ```
   */
  public equals(value: SolNative): boolean {
    return SolNative.equals(this, value);
  }

  /**
   * Converts the SolNative to a string.
   * @returns the value of the SolNative as a string
   * @example `native.format()`
   */
  public format(): MoralisDataFormatted {
    // TODO: add `format` argument
    return this.lamports;
  }

  /**
   * Converts the SolNative to a string.
   * @returns the value of the SolNative as a string
   * @example `native.toJSON()`
   */
  public toJSON(): string {
    return this.lamports;
  }

  /**
   * Converts the SolNative to a string.
   * @returns the value of the SolNative as a string
   * @example `native.toString()`
   */
  public toString(): string {
    return this.lamports;
  }

  /**
   * @returns the value of the SolNative as a BigNumber
   * @example `native.value`
   */
  public get value(): BigNumber {
    return this.rawValue;
  }

  /**
   * Converts the SolNative to a solana unit.
   * @returns the value of the SolNative as a solana string
   * @example `native.solana`
   */
  public get solana(): string {
    return this.rawValue.toDecimal(unitToDecimals['solana']);
  }

  /**
   * Converts the SolNative to a string.
   * @returns the value of the SolNative as a string
   * @example `native.lamports`
   */
  public get lamports(): string {
    return this.rawValue.toString();
  }
}
