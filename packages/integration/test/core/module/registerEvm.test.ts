import Core from '@moralisweb3/core';
import Evm from '@moralisweb3/evm';

describe('Moralis Core', () => {
  it('should register evm module', () => {
    Core.registerModules([Evm]);
    let listModule = Core.modules.list();
    expect(listModule).toContain(Evm);
    expect(listModule.length).toBe(1);
    expect(listModule).not.toBeUndefined();
    expect(listModule).toEqual(expect.arrayContaining([expect.objectContaining({})]));
    expect(() => Core.registerModules([Evm])).toThrowErrorMatchingInlineSnapshot(
      `"[C0002] The module evm has already been registered."`,
    );
  });
});
