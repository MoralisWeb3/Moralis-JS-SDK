import { BigNumber, BigNumberish, CoreErrorCode, CoreError, MoralisData } from '@moralisweb3/common-core';

/**
 * Type containing valid EVM native units
 */
export type EvmNativeUnit = 'ether' | 'finney' | 'szabo' | 'gwei' | 'mwei' | 'kwei' | 'wei';

const unitToDecimals: Record<EvmNativeUnit, number> = {
  ether: 18,
  finney: 15,
  szabo: 12,
  gwei: 9,
  mwei: 6,
  kwei: 3,
  wei: 0,
};

/**
 * A valid {@link EvmNativeUnit} or a number type
 */
type UnitOrDecimals = EvmNativeUnit | number;

/**
 * This is any valid {@link @moralisweb3/common-core!BigNumberish} value
 */
export type InputEvmNative = BigNumberish;

/**
 * Valid input for a new EvmNative instance.
 * This can be an existing {@link EvmNative} or a valid {@link InputEvmNative} type
 */
export type EvmNativeish = EvmNativeInput;

export type EvmNativeInput = InputEvmNative | EvmNative;

export type EvmNativeJSON = string;

/**
 * The EvmNative class is a MoralisData that references to the value of an EVM native currency (like ETH, BNB etc.)
 *
 * @category DataType
 */
export class EvmNative implements MoralisData {
  private readonly rawValue: BigNumber;

  /**
   * Returns value of one ether.
   *
   * @example EvmNative.ONE_ETH
   */
  public static get ONE_ETH() {
    return EvmNative.create(1, 'ether');
  }
  /**
   * Returns value of one gwei.
   *
   * @example EvmNative.ONE_GWEI
   */
  public static get ONE_GWEI() {
    return EvmNative.create(1, 'gwei');
  }
  /**
   * Returns value of one wei.
   *
   * @example EvmNative.ONE_WEI
   */
  public static get ONE_WEI() {
    return EvmNative.create(1, 'wei');
  }

  /**
   * Create a new instance of EvmNative from any valid {@link EvmNativeish} value.
   * @param native - the value to create the EvmNative from
   * @param unit - the unit of the value (optional), defaults to `ether`
   * @returns a new instance of EvmNative
   * @example
   * ```ts
   * const native = EvmNative.create(2, 'gwei');
   * const native = EvmNative.create(2);
   * const native = EvmNative.create(2, 'wei');
   *```
   */
  public static create(native: EvmNativeish, unit?: UnitOrDecimals) {
    if (native instanceof EvmNative) {
      return native;
    }
    return new EvmNative(native, unit);
  }

  public static fromJSON(json: EvmNativeJSON) {
    return EvmNative.create(json, 'wei');
  }

  private constructor(native: InputEvmNative, unit: UnitOrDecimals = 'ether') {
    this.rawValue = EvmNative.parse(native, unit);
  }

  private static parse(native: InputEvmNative, unit: UnitOrDecimals): BigNumber {
    let decimals: number;
    if (typeof unit === 'number') {
      decimals = unit;
    } else {
      if (unitToDecimals[unit] == null) {
        throw new CoreError({
          code: CoreErrorCode.INVALID_ARGUMENT,
          message: 'Unit should be a decimal number or valid EvmNativeUnit string',
        });
      }
      decimals = unitToDecimals[unit];
    }

    return BigNumber.fromDecimal(native.toString(), decimals);
  }

  /**
   * Compares two EvmNative values.
   * @param valueA - the first value to compare
   * @param valueB - the second value to compare
   * @returns true if the values are equal
   * @example
   * ```ts
   * EvmNative.equals(EvmNative.create(1, 'ether'), EvmNative.create(1, 'ether')); // true
   * ```
   */
  public static equals(valueA: EvmNativeish, valueB: EvmNativeish): boolean {
    const evmNativeA = EvmNative.create(valueA);
    const evmNativeB = EvmNative.create(valueB);

    return evmNativeA.rawValue.equals(evmNativeB.rawValue);
  }

  /**
   * Compares EvmNative with current instance.
   * @param value - the value to compare with
   * @returns true if the values are equal
   * @example
   * ```ts
   * const native = EvmNative.create(1, 'gwei');
   * native.equals(EvmNative.create(1, 'ether')); // false
   * ```
   */
  public equals(value: EvmNative): boolean {
    return EvmNative.equals(this, value);
  }

  /**
   * Converts the EvmNative to a string.
   * @returns the value of the EvmNative as a string
   * @example `native.toString()`
   */
  public toString(): string {
    return this.wei;
  }

  /**
   * Converts the EvmNative to a string.
   * @returns the value of the EvmNative as a string
   * @example `native.format()`
   */
  public format(): string {
    return this.toString();
  }

  /**
   * @returns the value of the EvmNative as a BigNumber
   * @example `native.value`
   */
  public get value(): BigNumber {
    return this.rawValue;
  }

  /**
   * Converts the EvmNative to a string representation of the value in wei.
   * @returns the value of the EvmNative as a string
   * @example `native.wei`
   */
  public get wei(): string {
    return this.value.toString();
  }

  /**
   * Converts the EvmNative to a string representation of the value in gwei.
   * @returns the value of the EvmNative as a string
   * @example `native.gwei`
   */
  public get gwei(): string {
    return this.rawValue.toDecimal(unitToDecimals['gwei']);
  }

  /**
   * Converts the EvmNative to a string representation of the value in ether.
   * @returns the value of the EvmNative as a string
   * @example `native.ether`
   */
  public get ether(): string {
    return this.rawValue.toDecimal(unitToDecimals['ether']);
  }

  public toJSON(): EvmNativeJSON {
    return this.toString();
  }
}
