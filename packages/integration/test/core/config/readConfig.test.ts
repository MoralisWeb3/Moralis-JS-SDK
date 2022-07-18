import { MoralisCore } from '@moralisweb3/core';

describe('Configuration test', () => {
  test('should read the configuration set to the value', () => {
    const core = MoralisCore.create();

    const key = 'defaultEvmApiChain';
    const value = '0x200';
    core.config.set(key, value);
    let readConfig = core.config.get(key);
    expect(readConfig).toBe(value);
    expect(readConfig).not.toBeUndefined();
  });
});
