import Core from '@moralis/core';
import Server from '@moralis/server';

describe('Moralis Core', () => {
  it('should register server module', () => {
    Core.registerModules([Server]);
    let listModule = Core.modules.list();
    expect(listModule).toContain(Server);
    expect(listModule.length).toBe(1);
    expect(listModule).not.toBeUndefined();
    expect(listModule).toEqual(expect.arrayContaining([expect.objectContaining({})]));
    expect(() => Core.registerModules([Server])).toThrowErrorMatchingInlineSnapshot(
      `"[C0002] The module server has already been registered."`,
    );
  });
});
