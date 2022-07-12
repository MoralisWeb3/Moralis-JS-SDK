import { MoralisCore } from '@moralisweb3/core';

describe('Moralis core', () => {
  test('should set the configuration key to the value', () => {
    const core = MoralisCore.create();

    const key = 'defaultEvmApiChain';
    const sampleValue = '0x200';
    let setConfig = core.config.set(key, sampleValue);
    expect(setConfig).toBeUndefined();
  });
});
