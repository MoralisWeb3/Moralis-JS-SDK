import { CoreErrorCode, CoreError } from '../../Error';

export class BigNumberFormatter {
  public static toDecimal(value: bigint, decimals: number): string {
    if (decimals < 0) {
      throw new CoreError({
        code: CoreErrorCode.BIG_NUMBER_ERROR,
        message: 'Invalid decimals',
      });
    }

    let result = value.toString();
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

    result = `${whole}.${fraction}`;

    while (result[result.length - 1] === '0' && result[result.length - 2] !== '.') {
      result = result.substring(0, result.length - 1);
    }
    if (isNegative) {
      result = `-${result}`;
    }
    return result;
  }

  public static toHex(value: bigint): string {
    let result = value.toString(16);
    const isNegative = result.startsWith('-');
    if (isNegative) {
      result = result.substring(1);
    }
    if (result.length % 2 !== 0) {
      result = `0${result}`;
    }
    result = `0x${result}`;
    if (isNegative) {
      result = `-${result}`;
    }
    return result;
  }
}
