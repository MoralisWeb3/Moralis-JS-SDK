import { BigNumber } from '@moralisweb3/common-core';
import { AptosNative, AptosNativeish, AptosNativeUnit } from './AptosNative';

describe('AptosNative', () => {
  function testUnit(
    value: AptosNativeish,
    unit: AptosNativeUnit | undefined,
    expectedAptos: string,
    expectedOctas: string,
  ) {
    it(`creates a value, unit: ${unit}`, () => {
      const native = AptosNative.create(value, unit);
      expect(native.aptos).toBe(expectedAptos);
      expect(native.octas).toBe(expectedOctas);
      expect(native.toString()).toBe(expectedOctas);
      expect(native.toJSON()).toBe(expectedOctas);
      expect(native.format()).toBe(expectedOctas);
    });
  }

  testUnit('4370020008', 'octas', '43.70020008', '4370020008');
  testUnit(4370020008, 'octas', '43.70020008', '4370020008');
  testUnit(4370020008, 0, '43.70020008', '4370020008');
  testUnit('43.70020008', 'aptos', '43.70020008', '4370020008');
  testUnit(43.70020008, 'aptos', '43.70020008', '4370020008');
  testUnit(43.70020008, undefined, '43.70020008', '4370020008');
  testUnit(43.70020008, 8, '43.70020008', '4370020008');

  it('throws an error when an unit is not supported', () => {
    expect(() => AptosNative.create(10, 'UNKNOWN' as any)).toThrowError('Not supported Aptos unit');
  });

  it('create() does not create a new instance when AptosNative passed', () => {
    const value1 = AptosNative.create(1000);
    const value2 = AptosNative.create(value1);

    expect(value1 === value2).toBe(true);
  });

  it('equals() returns correct value', () => {
    const v10a = AptosNative.create(10);
    const v10b = AptosNative.create(10);
    const v20 = AptosNative.create(20);

    expect(v10a.equals(v10b)).toBe(true);
    expect(v10b.equals(v10a)).toBe(true);
    expect(v10a.equals(v20)).toBe(false);
    expect(v10b.equals(v20)).toBe(false);
  });

  it('value is instance of BigNumber', () => {
    expect(AptosNative.create(1).value).toBeInstanceOf(BigNumber);
  });
});
