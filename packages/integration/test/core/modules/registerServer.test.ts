import Core from '@moralis/core';
import Server from '@moralis/server';

describe('Moralis Core', () => {
  test('should register server module', () => {
    Core.registerModules([Server]);
    let listModule = Core.modules.list();
    expect(listModule).toContain(Server);
    expect(listModule.length).toBe(1);
    expect(listModule).not.toBeUndefined();
  });
});
