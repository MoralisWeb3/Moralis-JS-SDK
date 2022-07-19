import { BigNumber, BigNumberish, parseFixed } from '@ethersproject/bignumber';
import { formatUnits } from '@ethersproject/units';
import { CoreErrorCode, MoralisCoreError } from '../Error';
import { MoralisData, MoralisDataFormatted } from './abstract';

export type SolNativeUnit = 'solana' | 'lamports' | number;

export type SolNativeish = SolNative | BigNumberish;

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
    } else if (unit === 'lamports') {
      decimal = 0;
    } else if (unit === 'solana') {
      decimal = 9;
    } else {
      throw new MoralisCoreError({
        code: CoreErrorCode.INVALID_ARGUMENT,
        message: `Not supported Solana unit: ${unit}`,
      });
    }
    return parseFixed(value.toString(), decimal);
  }

  // TODO: we cannot share an internal instance of BigNumber, because BigNumber is located in @ethersproject.
  // We should use some class from Solana JS stack. For example @solana/web3.js uses BN.js.
  // Temporary we use BigNumber internally.
  public get value(): unknown {
    throw new MoralisCoreError({
      code: CoreErrorCode.NOT_IMPLEMENTED,
      message: 'Not implemented',
    });
  }

  public get solana(): string {
    return formatUnits(this.rawValue, 9);
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
