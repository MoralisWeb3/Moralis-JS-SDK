import { CoreErrorCode, CoreError } from '../../Error';

/**
 * Valid input types for a BigNumber. This can be a number, string, or bigint.
 */
export type BigNumberPrimitive = number | string | bigint;

export class BigNumberParser {
  public static parseInt(value: BigNumberPrimitive): bigint {
    assertNotEmpty(value);

    if (typeof value === 'string') {
      if (value.length === 0) {
        throw createError('Value is empty');
      }

      const isNegativeHex = value.startsWith('-0x');
      if (isNegativeHex) {
        value = value.substring(1);
      }
      let result = BigInt(value);
      if (isNegativeHex) {
        result *= BigInt(-1);
      }
      return result;
    }

    return BigInt(value);
  }

  // TODO: refactor to reduce complexity
  // eslint-disable-next-line complexity
  public static parseDecimal(value: BigNumberPrimitive, decimals: number): bigint {
    assertNotEmpty(value);

    const multiplier = getMultiplier(decimals);

    if (typeof value === 'number') {
      return BigInt(value) * multiplier;
    }
    if (typeof value === 'bigint') {
      return value * multiplier;
    }

    const isNegative = value.startsWith('-');
    if (isNegative) {
      value = value.substring(1);
    }

    const fragments = value.split('.');
    if (fragments.length > 2) {
      throw createError('Value has more than one dot');
    }
    if (fragments.some((fragment) => !fragment)) {
      throw createError('Value has empty fragments');
    }

    let result: bigint;

    if (fragments.length === 1) {
      result = BigInt(fragments[0]) * multiplier;
    } else {
      const whole = fragments[0];
      let fraction = fragments[1];
      if (fraction.length > decimals) {
        throw createError(`Value has too long fractional part: ${fraction.length}, max: ${decimals}`);
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
}

function assertNotEmpty(value: BigNumberPrimitive) {
  if (value === null) {
    throw createError('Value is null');
  }
  if (value === undefined) {
    throw createError('Value is undefined');
  }
}

function getMultiplier(decimals: number): bigint {
  if (decimals < 0) {
    throw createError('Invalid decimals');
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

function createError(message: string): Error {
  return new CoreError({
    code: CoreErrorCode.BIG_NUMBER_ERROR,
    message,
  });
}
