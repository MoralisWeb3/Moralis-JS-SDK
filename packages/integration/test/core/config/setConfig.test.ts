import Core from '@moralisweb3/core';

describe('Moralis core', () => {
  test('should set the configuration key to the value', () => {
    const key = 'serverUrl';
    const sampleValue = 'http://localhost:8080';
    let setConfig = Core.config.set(key, sampleValue);
    expect(setConfig).toBeUndefined();
  });
});
