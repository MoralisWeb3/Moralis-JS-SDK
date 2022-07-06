import { noop } from './noop';

describe('noop', () => {
  it('should exist and do nothing', () => {
    expect(noop).toBeInstanceOf(Function);
    expect(noop()).toBeUndefined();
  });
});
