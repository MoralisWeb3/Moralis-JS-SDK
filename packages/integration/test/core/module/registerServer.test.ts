import { MoralisCore } from '@moralisweb3/core';
import { MoralisServer } from '@moralisweb3/server';

describe('Moralis Core', () => {
  it('should register server module', () => {
    const core = MoralisCore.create();
    const server = MoralisServer.create();

    core.registerModules([server]);
    let listModule = core.modules.list();
    expect(listModule).toContain(server);
    expect(listModule.length).toBe(1);
    expect(listModule).not.toBeUndefined();
    expect(listModule).toEqual(expect.arrayContaining([expect.objectContaining({})]));
    expect(() => core.registerModules([server])).toThrowError(
      '[C0002] The module "server" has already been registered',
    );
  });
});
