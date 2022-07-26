import {
  MoralisData,
  MoralisDataFormatted,
  CoreErrorCode,
  MoralisCoreError,
  BigNumberish,
  BigNumber,
} from '@moralisweb3/core';

export type SolNativeUnit = 'solana' | 'lamports' | number;

export type SolNativeish = SolNative | BigNumberish;

const unitToDecimals: Record<SolNativeUnit, number> = {
  solana: 9,
  lamports: 0,
};

export class SolNative implements MoralisData {
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
      throw new MoralisCoreError({
        code: CoreErrorCode.INVALID_ARGUMENT,
        message: `Not supported Solana unit: ${unit}`,
      });
    }
    return BigNumber.fromDecimal(value.toString(), decimal);
  }

  public get value(): BigNumber {
    return this.rawValue;
  }

  public get solana(): string {
    return this.rawValue.toDecimal(unitToDecimals['solana']);
  }

  public get lamports(): string {
    return this.rawValue.toString();
  }

  private constructor(private readonly rawValue: BigNumber) {}

  public format(): MoralisDataFormatted {
    // TODO: add `format` argument
    return this.lamports;
  }

  public equals(value: SolNative): boolean {
    return this.lamports === value.lamports;
  }

  public toJSON(): string {
    return this.lamports;
  }

  public toString(): string {
    return this.lamports;
  }
}
