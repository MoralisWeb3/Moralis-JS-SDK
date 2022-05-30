import Core from '@moralisweb3/core';

describe('Configuration test', () => {
  test('should read the configuration set to the value', () => {
    const key = 'serverUrl';
    const value = 'http://localhost:8080';
    Core.config.set(key, value);
    let readConfig = Core.config.get(key);
    expect(readConfig).toBe('http://localhost:8080');
    expect(readConfig).not.toBeUndefined();
  });
});
