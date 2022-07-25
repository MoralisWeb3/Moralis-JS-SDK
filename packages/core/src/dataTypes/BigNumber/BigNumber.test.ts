import { BigNumber as MoralisBigNumber } from './BigNumber';
import { parseFixed, BigNumber as EthersBigNumber } from '@ethersproject/bignumber';
import { formatUnits } from '@ethersproject/units';

describe('BigNumber', () => {
  describe('from()', () => {
    it('parses string', () => {
      const parseMoralis = (value: string) => {
        const v = MoralisBigNumber.from(value, 0);
        return {
          string: v.toString(),
          json: v.toJSON(),
          dec0: v.toDecimal(0),
          dec18: v.toDecimal(18),
          dec5: v.toDecimal(5),
        };
      };
      const parseEthers = (value: string) => {
        const v = parseFixed(value, 0);
        return {
          string: v.toString(),
          json: v.toJSON().hex,
          dec0: formatUnits(v, 0),
          dec18: formatUnits(v, 18),
          dec5: formatUnits(v, 5),
        };
      };

      function test(
        parse: (value: string) => { string: string; json: string; dec18: string; dec5: string; dec0: string },
      ) {
        const v = parse('1000000000000000000');
        expect(v.string).toEqual('1000000000000000000');
        expect(v.json).toEqual('0x0de0b6b3a7640000');
        expect(v.dec0).toEqual('1000000000000000000');
        expect(v.dec18).toEqual('1.0');
        expect(v.dec5).toEqual('10000000000000.0');
      }

      test(parseMoralis);
      test(parseEthers);
    });

    it('parses hex', () => {
      const parseHexMoralis = (value: string) => MoralisBigNumber.from(value).toString();
      const parseHexEthers = (value: string) => EthersBigNumber.from(value).toString();

      function test(parseHex: (value: string) => string) {
        expect(parseHex('0x1')).toEqual('1');
        expect(parseHex('0x100')).toEqual('256');
        expect(parseHex('0x0')).toEqual('0');
        expect(parseHex('-0x0')).toEqual('0');
        expect(parseHex('-0x100')).toEqual('-256');
      }

      test(parseHexMoralis);
      test(parseHexEthers);
    });

    it('parses decimal', () => {
      const parseMoralis = (value: string, decimals: number) => MoralisBigNumber.from(value, decimals).toString();
      const parseEthers = (value: string, decimals: number) => parseFixed(value, decimals).toString();

      function test(parse: (value: string, decimal: number) => string) {
        expect(parse('0', 0)).toEqual('0');
        expect(parse('0.0', 1)).toEqual('0');
        expect(parse('0.0', 6)).toEqual('0');
        expect(parse('0.1', 1)).toEqual('1');
        expect(parse('-0.1', 1)).toEqual('-1');
        expect(parse('-0.01', 2)).toEqual('-1');
        expect(parse('0.1', 2)).toEqual('10');
        expect(parse('0.1', 4)).toEqual('1000');
        expect(parse('1', 2)).toEqual('100');
        expect(parse('-1', 2)).toEqual('-100');
        expect(parse('-25', 2)).toEqual('-2500');
        expect(parse('999', 0)).toEqual('999');
        expect(parse('999', 2)).toEqual('99900');
        expect(parse('1.1', 18)).toEqual('1100000000000000000');
        expect(parse('25.12345', 18)).toEqual('25123450000000000000');
        expect(parse('-25.12345', 18)).toEqual('-25123450000000000000');
        expect(parse('0.128', 18)).toEqual('128000000000000000');
      }

      test(parseMoralis);
      test(parseEthers);
    });

    it('throws an error when fractional part is wrong', () => {
      const expectedError = 'value has too long fractional part';
      expect(() => MoralisBigNumber.from('0.0', 0)).toThrowError(expectedError);
      expect(() => MoralisBigNumber.from('0.0001', 1)).toThrowError(expectedError);
      expect(() => MoralisBigNumber.from('0.0000001', 4)).toThrowError(expectedError);
      expect(() => MoralisBigNumber.from('0.1', 0)).toThrowError(expectedError);
      expect(() => MoralisBigNumber.from('-0.1', 0)).toThrowError(expectedError);
    });

    it('throws an error when decimals is negative', () => {
      expect(() => MoralisBigNumber.from('1', -1)).toThrowError('invalid decimal');
    });

    it('does not create a new instance if BigNumber instance passed', () => {
      const value = MoralisBigNumber.from(0x1);

      expect(MoralisBigNumber.from(value) === value).toBe(true);
    });
  });

  describe('toDecimal()', () => {
    it('returns correct decimals', () => {
      const toDecimalMoralis = (value: string, decimals: number) => MoralisBigNumber.from(value).toDecimal(decimals);
      const toDecimalEthers = (value: string, decimals: number) => formatUnits(value, decimals);

      function test(toDecimal: (value: string, decimals: number) => string) {
        expect(toDecimal('0', 0)).toEqual('0');
        expect(toDecimal('-0', 0)).toEqual('0');
        expect(toDecimal('0', 2)).toEqual('0.0');
        expect(toDecimal('-0', 2)).toEqual('0.0');
        expect(toDecimal('0', 10)).toEqual('0.0');
        expect(toDecimal('-256', 0)).toEqual('-256');
        expect(toDecimal('256', 0)).toEqual('256');
        expect(toDecimal('256', 1)).toEqual('25.6');
        expect(toDecimal('-256', 1)).toEqual('-25.6');
        expect(toDecimal('256', 2)).toEqual('2.56');
        expect(toDecimal('256', 5)).toEqual('0.00256');
        expect(toDecimal('256', 10)).toEqual('0.0000000256');
        expect(toDecimal('-256', 10)).toEqual('-0.0000000256');
        expect(toDecimal('256', 18)).toEqual('0.000000000000000256');
        expect(toDecimal('-256', 18)).toEqual('-0.000000000000000256');
      }

      test(toDecimalMoralis);
      test(toDecimalEthers);
    });

    it('throws an error if decimals is negative', () => {
      expect(() => MoralisBigNumber.from(0).toDecimal(-1)).toThrowError('invalid decimals');
    });
  });

  it('parses integers', () => {
    const parseMoralis = (value: number, decimals: number) => MoralisBigNumber.from(value, decimals).toString();
    const parseEthers = (value: number, decimals: number) => parseFixed(value.toString(), decimals).toString();

    function test(parse: (value: number, decimals: number) => string) {
      expect(parse(0, 0)).toEqual('0');
      expect(parse(10, 0)).toEqual('10');
      expect(parse(-10, 0)).toEqual('-10');
      expect(parse(128, 0)).toEqual('128');
      expect(parse(128, 5)).toEqual('12800000');
      expect(parse(128, 0)).toEqual('128');
      expect(parse(128, 1)).toEqual('1280');
      expect(parse(-128, 1)).toEqual('-1280');
      expect(parse(-128, 10)).toEqual('-1280000000000');
    }

    test(parseMoralis);
    test(parseEthers);
  });

  it('eq() returns correct value', () => {
    expect(MoralisBigNumber.from(1).eq(MoralisBigNumber.from(1))).toBe(true);
    expect(MoralisBigNumber.from(1).eq(MoralisBigNumber.from(-1))).toBe(false);
  });

  it('throws an error when NaN passed', () => {
    expect(() => MoralisBigNumber.from(NaN)).toThrowError('The number NaN cannot be converted to a BigInt');
  });

  it('throws an error when invalid string passed', () => {
    function test(input: string, expectedError: string = 'Cannot convert') {
      expect(() => MoralisBigNumber.from(input)).toThrowError(expectedError);
    }

    test('lorem ipsum');
    test('-x');
    test('x');
    test('##');
    test('$$');
    test('!');
    test('..', 'value has more than one dot');
    test('.', 'value has empty fragments');
    test('', 'value has empty fragments');
    test('-', 'value has empty fragments');
  });

  it('toHex() returns correct values', () => {
    const toHexMoralis = (value: string) => MoralisBigNumber.from(value).toHex();
    const toHexEthers = (value: string) => parseFixed(value).toHexString();

    function test(toHex: (value: string) => string) {
      expect(toHex('10')).toEqual('0x0a');
      expect(toHex('200')).toEqual('0xc8');
      expect(toHex('0')).toEqual('0x00');
      expect(toHex('351')).toEqual('0x015f');
      expect(toHex('123456789')).toEqual('0x075bcd15');
      expect(toHex('-0')).toEqual('0x00');
      expect(toHex('0')).toEqual('0x00');
      expect(toHex('-100')).toEqual('-0x64');
      expect(toHex('-1')).toEqual('-0x01');
      expect(toHex('-123456789')).toEqual('-0x075bcd15');
    }

    test(toHexMoralis);
    test(toHexEthers);
  });
});
