import { isTest } from './isTest';

describe('isTest', () => {
  it('should return true if the current process is running in a test environment', () => {
    expect(isTest()).toBe(true);
  });
});
