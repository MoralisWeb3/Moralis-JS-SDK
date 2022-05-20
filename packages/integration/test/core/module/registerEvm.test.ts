import Core from '@moralis/core';
import Evm from '@moralis/evm';

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
