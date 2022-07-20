import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { formatUnits, parseUnits } from '@ethersproject/units';
import { CoreErrorCode, MoralisCoreError } from '../Error';
import { MoralisData } from './abstract';

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

type UnitOrDecimals = EvmNativeUnit | number;

export type InputEvmNative = BigNumberish;
export type EvmNativeish = InputEvmNative | EvmNative;

/**
 * The EvmNative class is a MoralisData that references to a the value of a native currency (like ETH, BNB etc.)
 */
export class EvmNative implements MoralisData {
  private readonly rawValue: BigNumber;

  private constructor(native: InputEvmNative, unit: UnitOrDecimals = 'ether') {
    this.rawValue = EvmNative.parse(native, unit);
  }

  public static create(native: EvmNativeish, unit?: UnitOrDecimals) {
    if (native instanceof EvmNative) {
      return native;
    }
    return new EvmNative(native, unit);
  }

  private static parse(native: InputEvmNative, unit: UnitOrDecimals): BigNumber {
    let decimals: number;
    if (typeof unit === 'number') {
      decimals = unit;
    } else {
      if (unitToDecimals[unit] == null) {
        throw new MoralisCoreError({
          code: CoreErrorCode.INVALID_ARGUMENT,
          message: 'Unit should be a decimal number or valid EvmNativeUnit string',
        });
      }
      decimals = unitToDecimals[unit];
    }

    const value = parseUnits(native.toString(), decimals);

    return value;
  }

  public static equals(valueA: EvmNativeish, valueB: EvmNativeish) {
    const evmNativeA = EvmNative.create(valueA);
    const evmNativeB = EvmNative.create(valueB);

    return evmNativeA.rawValue.eq(evmNativeB.rawValue);
  }

  public equals(value: EvmNative) {
    return EvmNative.equals(this, value);
  }

  public get value() {
    return this.rawValue;
  }

  public get wei() {
    return this.value.toString();
  }

  public get gwei() {
    return formatUnits(this.rawValue, 'gwei');
  }

  public get ether() {
    return formatUnits(this.rawValue, 'ether');
  }

  public toString() {
    return this.wei;
  }

  public format() {
    return this.toString();
  }
}
