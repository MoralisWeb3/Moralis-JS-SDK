import {
  MoralisData,
  MoralisDataFormatted,
  CoreErrorCode,
  CoreError,
  BigNumberish,
  BigNumber,
} from '@moralisweb3/common-core';

/**
 * Type containing valid Aptos native units
 */
export type AptosNativeUnit = 'aptos' | 'octas' | number;

/**
 * Valid input for a new AptosNative instance.
 * This can be an existing {@link AptosNative} or a valid {@link @moralisweb3/common-core!BigNumberish} type
 */
export type AptosNativeish = AptosNative | BigNumberish;

const unitToDecimals: Record<AptosNativeUnit, number> = {
  aptos: 8,
  octas: 0,
};

/**
 * The AptosNative class is a MoralisData that references to the value of Aptos native currency APT
 *
 * @category DataType
 */
export class AptosNative implements MoralisData {
  /**
   * Create a new instance of AptosNative from any valid {@link AptosNativeish} value.
   * @param value - the value to create the AptosNative from
   * @param unit - the unit of the value (optional), defaults to `aptos`
   * @returns a new instance of AptosNative
   * @example
   * ```ts
   * const native = AptosNative.create(2, 'octas');
   * const native = AptosNative.create(2);
   *```
   */
  public static create(value: AptosNativeish, unit?: AptosNativeUnit): AptosNative {
    if (value instanceof AptosNative) {
      return value;
    }
    return new AptosNative(AptosNative.parse(value, unit));
  }

  private static parse(value: BigNumberish, unit: AptosNativeUnit = 'aptos'): BigNumber {
    let decimal: number;
    if (typeof unit === 'number') {
      decimal = unit;
    } else if (unitToDecimals[unit] !== undefined) {
      decimal = unitToDecimals[unit];
    } else {
      throw new CoreError({
        code: CoreErrorCode.INVALID_ARGUMENT,
        message: `Not supported Aptos unit: ${unit}`,
      });
    }
    return BigNumber.fromDecimal(value.toString(), decimal);
  }

  private constructor(private readonly rawValue: BigNumber) {}

  /**
   * Compares two AptosNativeish values.
   * @param valueA - the first value to compare
   * @param valueB - the second value to compare
   * @returns true if the values are equal
   * @example
   * ```ts
   * AptosNative.equals(AptosNative.create(1), AptosNative.create(1)); // true
   * ```
   */
  public static equals(valueA: AptosNativeish, valueB: AptosNativeish): boolean {
    const aptosNativeA = AptosNative.create(valueA);
    const aptosNativeB = AptosNative.create(valueB);

    return aptosNativeA.octas === aptosNativeB.octas;
  }

  /**
   * Compares AptosNative with current instance.
   * @param value - the value to compare with
   * @returns true if the values are equal
   * @example
   * ```ts
   * const native = AptosNative.create(2, 'octas');
   * native.equals(AptosNative.create(1)); // false
   * ```
   */
  public equals(value: AptosNative): boolean {
    return AptosNative.equals(this, value);
  }

  /**
   * Converts the AptosNative to a string.
   * @returns the value of the AptosNative as a string
   * @example `native.format()`
   */
  public format(): MoralisDataFormatted {
    // TODO: add `format` argument
    return this.octas;
  }

  /**
   * Converts the AptosNative to a string.
   * @returns the value of the AptosNative as a string
   * @example `native.toJSON()`
   */
  public toJSON(): string {
    return this.octas;
  }

  /**
   * Converts the AptosNative to a string.
   * @returns the value of the AptosNative as a string
   * @example `native.toString()`
   */
  public toString(): string {
    return this.octas;
  }

  /**
   * @returns the value of the AptosNative as a BigNumber
   * @example `native.value`
   */
  public get value(): BigNumber {
    return this.rawValue;
  }

  /**
   * Converts the AptosNative to an aptos unit.
   * @returns the value of the AptosNative as an aptos string
   * @example `native.aptos`
   */
  public get aptos(): string {
    return this.rawValue.toDecimal(unitToDecimals['aptos']);
  }

  /**
   * Converts the AptosNative to a string.
   * @returns the value of the AptosNative as a string
   * @example `native.lamports`
   */
  public get octas(): string {
    return this.rawValue.toString();
  }
}
