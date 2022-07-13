/**
 * @returns true if the current process is running in a test environment.
 */
export const isTest = (): boolean => {
  if (typeof process !== 'undefined') {
    return process.env?.NODE_ENV === 'test';
  }
  return false;
};
