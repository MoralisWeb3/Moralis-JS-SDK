import { MoralisCore } from '@moralisweb3/core';
import { MoralisEvm } from '@moralisweb3/evm';

describe('Moralis Core', () => {
  it('should register evm module', () => {
    const core = MoralisCore.create();
    const evm = MoralisEvm.create(core);

    core.registerModules([evm]);
    let listModule = core.modules.list();
    expect(listModule).toContain(evm);
    expect(listModule.length).toBe(1);
    expect(listModule).not.toBeUndefined();
    expect(listModule).toEqual(expect.arrayContaining([expect.objectContaining({})]));
    expect(() => core.registerModules([evm])).toThrowError(`[C0002] The module "evm" has already been registered`);
  });
});
