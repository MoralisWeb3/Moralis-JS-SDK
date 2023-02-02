import { SimpleTypeNormalizer } from './SimpleTypeNormalizer';

describe('SimpleTypeNormalizer', () => {
  it('normalizes integer to number', () => {
    expect(SimpleTypeNormalizer.normalize('integer')).toBe('number');
  });

  it('throw an error when array type is passed', () => {
    expect(() => SimpleTypeNormalizer.normalize('array')).toThrowError('Invalid simple type');
  });
});
