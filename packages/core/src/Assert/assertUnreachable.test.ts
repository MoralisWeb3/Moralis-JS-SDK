import { assertUnreachable } from './assertUnreachable';

describe('assertUnreachable', () => {
  it('should throw an error when called', () => {
    const value = 'test';

    // @ts-ignore
    expect(() => assertUnreachable(value)).toThrowErrorMatchingInlineSnapshot(
      `"[C0001] Incorrect type provided, code should not reach here"`,
    );
  });
});
