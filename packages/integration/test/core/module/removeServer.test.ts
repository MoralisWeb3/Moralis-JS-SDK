import { MoralisCore } from '@moralisweb3/core';
import { MoralisServer } from '@moralisweb3/server';

describe('Moralis Core', () => {
  test('should remove server module', () => {
    const core = MoralisCore.create();
    const server = MoralisServer.create();

    core.registerModules([server]);
    core.modules.remove('server');
    let listModule = core.modules.list();
    expect(listModule).not.toContain(server);
    expect(listModule.length).toBe(0);
    expect(listModule).not.toBeUndefined();
    expect(() => core.modules.remove('server')).toThrowErrorMatchingInlineSnapshot(
      `"[C0003] Module \\"server\\" does not exist."`,
    );
  });
});
