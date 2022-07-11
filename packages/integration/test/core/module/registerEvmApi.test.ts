import { MoralisCore } from '@moralisweb3/core';
import { MoralisEvmApi } from '@moralisweb3/evm-api';

describe('Moralis Core', () => {
  it('should register evm-api module', () => {
    const core = MoralisCore.create();
    const evmApi = MoralisEvmApi.create(core);

    core.registerModules([evmApi]);
    let listModule = core.modules.list();
    expect(listModule).toContain(evmApi);
    expect(listModule.length).toBe(1);
    expect(listModule).not.toBeUndefined();
    expect(listModule).toEqual(expect.arrayContaining([expect.objectContaining({})]));
    expect(() => core.registerModules([evmApi])).toThrowErrorMatchingInlineSnapshot(
      `"[C0002] The module evmApi has already been registered."`,
    );
  });
});
