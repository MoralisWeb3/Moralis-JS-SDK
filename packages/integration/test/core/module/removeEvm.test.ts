import { MoralisCore } from '@moralisweb3/core';
import { MoralisEvm } from '@moralisweb3/evm';

describe('Moralis Core', () => {
  test('should remove evm module', () => {
    const core = MoralisCore.create();
    const evm = MoralisEvm.create(core);

    core.registerModules([evm]);
    core.modules.remove('evm');
    let listModule = core.modules.list();
    expect(listModule).not.toContain(evm);
    expect(listModule.length).toBe(0);
    expect(listModule).not.toBeUndefined();
    expect(() => core.modules.remove('evm')).toThrowError('[C0003] Module "evm" does not exist');
  });
});
