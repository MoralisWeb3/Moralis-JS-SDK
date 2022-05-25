import Core from '@moralisweb3/core';
import EvmApi from '@moralisweb3/evm-api';

describe('Moralis Core', () => {
  test('should remove evm-api module', () => {
    Core.registerModules([EvmApi]);
    Core.modules.remove('evmApi');
    let listModule = Core.modules.list();
    expect(listModule).not.toContain(EvmApi);
    expect(listModule.length).toBe(0);
    expect(listModule).not.toBeUndefined();
    expect(() => Core.modules.remove('evm-api')).toThrowErrorMatchingInlineSnapshot(
      `"[C0003] Module \\"evm-api\\" does not exist."`,
    );
  });
});
