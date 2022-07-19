import { SolNative, SolNativeish, SolNativeUnit } from './SolNative';

describe('SolNative', () => {
  function testUnit(
    value: SolNativeish,
    unit: SolNativeUnit | undefined,
    expectedSolana: string,
    expectedLamports: string,
  ) {
    it(`creates a value, unit: ${unit}`, () => {
      const native = SolNative.create(value, unit);
      expect(native.solana).toBe(expectedSolana);
      expect(native.lamports).toBe(expectedLamports);
      expect(native.toString()).toBe(expectedLamports);
    });
  }

  testUnit('43700200083', 'lamports', '43.700200083', '43700200083');
  testUnit(43700200083, 'lamports', '43.700200083', '43700200083');
  testUnit(43700200083, 0, '43.700200083', '43700200083');
  testUnit('43.700200083', 'solana', '43.700200083', '43700200083');
  testUnit(43.700200083, 'solana', '43.700200083', '43700200083');
  testUnit(43.700200083, undefined, '43.700200083', '43700200083');
  testUnit(43.700200083, 9, '43.700200083', '43700200083');

  it('equals() returns correct value', () => {
    const v10a = SolNative.create(10);
    const v10b = SolNative.create(10);
    const v20 = SolNative.create(20);

    expect(v10a.equals(v10b)).toBe(true);
    expect(v10b.equals(v10a)).toBe(true);
    expect(v10a.equals(v20)).toBe(false);
    expect(v10b.equals(v20)).toBe(false);
  });
});
