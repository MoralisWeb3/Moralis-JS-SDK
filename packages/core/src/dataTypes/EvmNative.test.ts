import { EvmNative, EvmNativeUnit } from './EvmNative';

describe('EvmNative', () => {
  function testUnit(unit: EvmNativeUnit, wei: string, gwei: string, ether: string) {
    it(`creates 1 ${unit}`, () => {
      const value = EvmNative.create(1, unit);
      expect(value.toString()).toEqual(wei);
      expect(value.format()).toEqual(wei);
      expect(value.wei).toEqual(wei);
      expect(value.gwei).toEqual(gwei);
      expect(value.ether).toEqual(ether);
    });
  }

  testUnit('ether', '1000000000000000000', '1000000000.0', '1.0');
  testUnit('finney', '1000000000000000', '1000000.0', '0.001');
  testUnit('szabo', '1000000000000', '1000.0', '0.000001');
  testUnit('gwei', '1000000000', '1.0', '0.000000001');
  testUnit('mwei', '1000000', '0.001', '0.000000000001');
  testUnit('kwei', '1000', '0.000001', '0.000000000000001');
  testUnit('wei', '1', '0.000000001', '0.000000000000000001');

  it('creates 1 of default unit', () => {
    const value = EvmNative.create(1);
    expect(value.ether).toEqual('1.0');
    expect(value.wei).toEqual('1000000000000000000');
  });

  it('creates 1 of 15 decimals unit', () => {
    const value = EvmNative.create(1, 15);
    expect(value.ether).toEqual('0.001');
  });

  it('throws an error when a string unit is invalid', () => {
    expect(() => EvmNative.create(1, 'UNKNOWN' as any)).toThrowError(
      '[C0005] Unit should be a decimal number or valid EvmNativeUnit string',
    );
  });

  it('compares correctly', () => {
    const v10a = EvmNative.create(10, 'gwei');
    const v10b = EvmNative.create(10, 'gwei');
    const v20 = EvmNative.create(20, 'gwei');

    expect(v10a.equals(v10b)).toBe(true);
    expect(v10b.equals(v10a)).toBe(true);
    expect(EvmNative.equals(v10a, v10b)).toBe(true);
    expect(EvmNative.equals(v10b, v10a)).toBe(true);

    expect(v10a.equals(v20)).toBe(false);
    expect(v20.equals(v10a)).toBe(false);
    expect(v20.equals(v10b)).toBe(false);
    expect(EvmNative.equals(v10a, v20)).toBe(false);
  });
});
