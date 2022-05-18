import Core from '@moralis/core';
import EvmApi from '@moralis/evm-api';

describe('Moralis Core', () => {
  it('should register evm-api module', () => {
    Core.registerModules([EvmApi]);
    let listModule = Core.modules.list();
    expect(listModule).toContain(EvmApi);
    expect(listModule.length).toBe(1);
    expect(listModule).not.toBeUndefined();
    expect(listModule).toEqual(expect.arrayContaining([expect.objectContaining({})]));
    expect(() => Core.registerModules([EvmApi])).toThrowErrorMatchingInlineSnapshot(
      `"[C0002] The module evm-api has already been registered."`,
    );
  });
});
