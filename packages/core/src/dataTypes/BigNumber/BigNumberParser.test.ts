import { BigNumberParser, BigNumberPrimitive } from './BigNumberParser';

describe('BigNumberParser', () => {
  describe('parseInt()', () => {
    const parseInt = (value: BigNumberPrimitive) => BigNumberParser.parseInt(value).toString();

    it('returns correct value', () => {
      expect(parseInt(0)).toEqual('0');
      expect(parseInt(10)).toEqual('10');
      expect(parseInt(-10)).toEqual('-10');
      expect(parseInt('100')).toEqual('100');
      expect(parseInt('-100')).toEqual('-100');
      expect(parseInt('0x1')).toEqual('1');
      expect(parseInt('0x0')).toEqual('0');
      expect(parseInt('-0x0')).toEqual('0');
      expect(parseInt('0x100')).toEqual('256');
      expect(parseInt('-0x100')).toEqual('-256');
      expect(parseInt('0')).toEqual('0');
      expect(parseInt('-0')).toEqual('0');
      expect(parseInt(BigInt(10))).toEqual('10');
      expect(parseInt(10)).toEqual('10');
    });

    it('throws an error when NaN passed', () => {
      expect(() => parseInt(NaN)).toThrowError('The number NaN cannot be converted to a BigInt');
    });
  });

  describe('parseDecimal()', () => {
    const parseDecimal = (value: BigNumberPrimitive, decimals: number) =>
      BigNumberParser.parseDecimal(value, decimals).toString();

    it('returns correct value', () => {
      expect(parseDecimal('0', 0)).toEqual('0');
      expect(parseDecimal('0.0', 1)).toEqual('0');
      expect(parseDecimal('0.0', 6)).toEqual('0');
      expect(parseDecimal('0.1', 1)).toEqual('1');
      expect(parseDecimal('-0.1', 1)).toEqual('-1');
      expect(parseDecimal('-0.01', 2)).toEqual('-1');
      expect(parseDecimal('0.1', 2)).toEqual('10');
      expect(parseDecimal('0.1', 4)).toEqual('1000');
      expect(parseDecimal('1', 2)).toEqual('100');
      expect(parseDecimal('-1', 2)).toEqual('-100');
      expect(parseDecimal('-25', 2)).toEqual('-2500');
      expect(parseDecimal('999', 0)).toEqual('999');
      expect(parseDecimal('999', 2)).toEqual('99900');
      expect(parseDecimal('1.1', 18)).toEqual('1100000000000000000');
      expect(parseDecimal('25.12345', 18)).toEqual('25123450000000000000');
      expect(parseDecimal('-25.12345', 18)).toEqual('-25123450000000000000');
      expect(parseDecimal('0.128', 18)).toEqual('128000000000000000');
      expect(parseDecimal('0x0', 0)).toEqual('0');
      expect(parseDecimal('-0x0', 0)).toEqual('0');
      expect(parseDecimal('0x100', 0)).toEqual('256');
      expect(parseDecimal('-0x100', 0)).toEqual('-256');
      expect(parseDecimal(1, 0)).toEqual('1');
      expect(parseDecimal(1, 5)).toEqual('100000');
      expect(parseDecimal(BigInt(1), 0)).toEqual('1');
      expect(parseDecimal(BigInt(1), 5)).toEqual('100000');
    });

    it('throws an error when invalid string passed', () => {
      function test(input: string, expectedError: string = 'Cannot convert') {
        expect(() => parseDecimal(input, 0)).toThrowError(expectedError);
      }

      test('lorem ipsum');
      test('-x');
      test('x');
      test('##');
      test('$$');
      test('!');
      test('..', 'Value has more than one dot');
      test('.', 'Value has empty fragments');
      test('', 'Value has empty fragments');
      test('-', 'Value has empty fragments');
    });

    it('throws an error when fractional part is wrong', () => {
      const expectedError = 'Value has too long fractional part';
      expect(() => parseDecimal('0.0', 0)).toThrowError(expectedError);
      expect(() => parseDecimal('0.0001', 1)).toThrowError(expectedError);
      expect(() => parseDecimal('0.0000001', 4)).toThrowError(expectedError);
      expect(() => parseDecimal('0.1', 0)).toThrowError(expectedError);
      expect(() => parseDecimal('-0.1', 0)).toThrowError(expectedError);
    });

    it('throws an error when decimals is negative', () => {
      expect(() => parseDecimal('1', -1)).toThrowError('Invalid decimal');
    });
  });
});
