import { JsonRef } from './JsonRef';

describe('JsonRef', () => {
  it('serializes correctly', () => {
    expect(JsonRef.from(['a', 'b', 'c']).toString()).toBe('#/a/b/c');
  });

  it('parses correctly', () => {
    const ref = JsonRef.parse('#/a/b/c');
    expect(ref.parts.length).toBe(3);
    expect(ref.parts[0]).toBe('a');
    expect(ref.parts[1]).toBe('b');
    expect(ref.parts[2]).toBe('c');
  });
});
