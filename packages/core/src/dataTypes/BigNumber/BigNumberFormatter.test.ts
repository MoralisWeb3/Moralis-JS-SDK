import { BigNumberFormatter } from './BigNumberFormatter';

describe('BigNumberFormatter', () => {
  describe('toDecimal()', () => {
    const toDecimal = (value: string, decimals: number) => BigNumberFormatter.toDecimal(BigInt(value), decimals);

    it('returns correct value', () => {
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
    });

    it('throws an error if decimals is negative', () => {
      expect(() => toDecimal('0', -1)).toThrowError('Invalid decimals');
    });
  });

  describe('toHex()', () => {
    const toHex = (value: string) => BigNumberFormatter.toHex(BigInt(value));

    it('returns correct value', () => {
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
    });
  });
});
