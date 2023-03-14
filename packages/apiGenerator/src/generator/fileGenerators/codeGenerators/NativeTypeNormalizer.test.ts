import { NativeTypeNormalizer } from './NativeTypeNormalizer';

describe('NativeTypeNormalizer', () => {
  it('normalizes integer to number', () => {
    expect(NativeTypeNormalizer.normalize('integer')).toBe('number');
  });

  it('normalizes string to string', () => {
    expect(NativeTypeNormalizer.normalize('string')).toBe('string');
  });

  it('throw an error when array type is passed', () => {
    expect(() => NativeTypeNormalizer.normalize('array')).toThrowError('Invalid native type: array');
  });
});
