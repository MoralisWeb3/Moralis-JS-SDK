import Core from '@moralis/core';
import Server from '@moralis/server';

describe('Moralis Core', () => {
  test('should remove server module', () => {
    Core.registerModules([Server]);
    Core.modules.remove('server');
    let listModule = Core.modules.list();
    expect(listModule).not.toContain(Server);
    expect(listModule.length).toBe(0);
  });
});
