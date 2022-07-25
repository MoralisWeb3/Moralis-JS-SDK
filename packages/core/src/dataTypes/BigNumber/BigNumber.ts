function getMultiplier(decimals: number): bigint {
  if (decimals < 0) {
    throw new Error('BigNumber: invalid decimals');
  }
  // decimals = 0, multiplier = 1
  // decimals = 1, multiplier = 10
  // decimals = 2, multiplier = 100
  // ...
  const ten = BigInt(10);
  let multiplier = BigInt(1);
  while (decimals-- > 0) {
    multiplier *= ten;
  }
  return multiplier;
}

export type BigNumberPrimitive = number | string | bigint;
export type BigNumberish = BigNumber | BigNumberPrimitive;

export class BigNumber {
  public static from(value: BigNumberish, decimals = 0): BigNumber {
    if (value instanceof BigNumber) {
      return value;
    }
    return new BigNumber(BigNumber.parse(value, decimals));
  }

  private static parse(value: BigNumberPrimitive, decimals: number): bigint {
    if (typeof value !== 'string') {
      return BigInt(value) * getMultiplier(decimals);
    }
    return BigNumber.parseString(value, decimals);
  }

  private static parseString(value: string, decimals: number): bigint {
    const isNegative = value.startsWith('-');
    if (isNegative) {
      value = value.substring(1);
    }

    const fragments = value.startsWith('0x') ? [value] : value.split('.');
    if (fragments.length > 2) {
      throw new Error('BigNumber: value has more than one dot');
    }
    if (fragments.some((fragment) => !fragment)) {
      throw new Error('BigNumber: value has empty fragments');
    }

    const multiplier = getMultiplier(decimals);
    let result: bigint;

    if (fragments.length === 1) {
      result = BigInt(fragments[0]) * multiplier;
    } else {
      const whole = fragments[0];
      let fraction = fragments[1];
      if (fraction.length > decimals) {
        throw new Error(`BigNumber: value has too long fractional part: ${fraction.length}, max: ${decimals}`);
      }
      if (fraction.length < decimals) {
        fraction = fraction.padEnd(decimals, '0');
      }

      result = BigInt(whole) * multiplier + BigInt(fraction);
    }

    if (isNegative) {
      result *= BigInt(-1);
    }
    return result;
  }

  public constructor(private readonly value: bigint) {}

  public toBigInt(): bigint {
    return this.value;
  }

  public mul(value: BigNumberish): BigNumber {
    return new BigNumber(this.value * BigNumber.from(value).toBigInt());
  }

  public eq(value: BigNumber): boolean {
    return this.value === value.toBigInt();
  }

  public toDecimal(decimals: number): string {
    if (decimals < 0) {
      throw new Error('BigNumber: invalid decimals');
    }
    let result = this.value.toString();
    if (decimals === 0) {
      return result;
    }

    const isNegative = result.startsWith('-');
    if (isNegative) {
      result = result.substring(1);
    }
    result = result.padStart(decimals, '0');

    const dot = result.length - decimals;
    const whole = dot === 0 ? '0' : result.substring(0, dot);
    const fraction = result.substring(dot);

    result = whole + '.' + fraction;

    while (result[result.length - 1] === '0' && result[result.length - 2] !== '.') {
      result = result.substring(0, result.length - 1);
    }
    if (isNegative) {
      result = '-' + result;
    }
    return result;
  }

  public toString(): string {
    return this.value.toString();
  }

  public toHex(): string {
    let result = this.value.toString(16);
    const isNegative = result.startsWith('-');
    if (isNegative) {
      result = result.substring(1);
    }
    if (result.length % 2 !== 0) {
      result = '0' + result;
    }
    result = '0x' + result;
    if (isNegative) {
      result = '-' + result;
    }
    return result;
  }

  public toJSON(): string {
    return this.toHex();
  }
}
