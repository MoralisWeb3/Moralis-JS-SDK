import { JsonRef } from './JsonRef';

describe('JsonRef', () => {
  it('serializes correctly', () => {
    expect(JsonRef.serialize(['a', 'b', 'c'])).toBe('#/a/b/c');
  });

  it('parses correctly', () => {
    const parts = JsonRef.parse('#/a/b/c');
    expect(parts.length).toBe(3);
    expect(parts[0]).toBe('a');
    expect(parts[1]).toBe('b');
    expect(parts[2]).toBe('c');
  });
});
