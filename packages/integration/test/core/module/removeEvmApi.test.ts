import { MoralisCore } from '@moralisweb3/core';
import MoralisEvmApi from '@moralisweb3/evm-api';

describe('Moralis Core', () => {
  test('should remove evm-api module', () => {
    const core = MoralisCore.create();
    const evmApi = MoralisEvmApi.create(core);

    core.registerModules([evmApi]);
    core.modules.remove('evmApi');

    let listModule = core.modules.list();
    expect(listModule).not.toContain(evmApi);
    expect(listModule.length).toBe(0);
    expect(listModule).not.toBeUndefined();
    expect(() => core.modules.remove('evm-api')).toThrowError('[C0003] Module "evm-api" does not exist');
  });
});
