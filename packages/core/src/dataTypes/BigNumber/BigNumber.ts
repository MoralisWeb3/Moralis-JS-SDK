import { BigNumberFormatter } from './BigNumberFormatter';
import { BigNumberParser, BigNumberPrimitive } from './BigNumberParser';

/**
 * Valid input for a new BigNumber instance.
 * This can be an existing {@link BigNumber} or a valid {@link BigNumberPrimitive} type
 */
export type BigNumberish = BigNumber | BigNumberPrimitive;

export class BigNumber {
  public static create(value: BigNumberish): BigNumber {
    if (value instanceof BigNumber) {
      return value;
    }
    return new BigNumber(BigNumberParser.parseInt(value));
  }

  public static fromDecimal(value: BigNumberPrimitive, decimals = 0): BigNumber {
    return new BigNumber(BigNumberParser.parseDecimal(value, decimals));
  }

  private constructor(private readonly value: bigint) {}

  public toBigInt(): bigint {
    return this.value;
  }

  public add(value: BigNumberish): BigNumber {
    return new BigNumber(this.value + asBigInt(value));
  }

  public sub(value: BigNumberish): BigNumber {
    return new BigNumber(this.value - asBigInt(value));
  }

  public mul(value: BigNumberish): BigNumber {
    return new BigNumber(this.value * asBigInt(value));
  }

  public div(value: BigNumberish): BigNumber {
    return new BigNumber(this.value / asBigInt(value));
  }

  public equals(value: BigNumber): boolean {
    return this.value === value.toBigInt();
  }

  public toDecimal(decimals: number): string {
    return BigNumberFormatter.toDecimal(this.value, decimals);
  }

  public toString(): string {
    return this.value.toString();
  }

  public toHex(): string {
    return BigNumberFormatter.toHex(this.value);
  }

  public toJSON(): string {
    return this.toHex();
  }
}

function asBigInt(value: BigNumberish): bigint {
  return BigNumber.create(value).toBigInt();
}
