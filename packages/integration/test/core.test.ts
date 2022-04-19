import Core from '@moralis/core';
import Server from '@moralis/server';

describe('MoralisCore', () => {
  it('should register the server module when its imported', () => {
    Core.registerModules({
      modules: [Server],
    });
  });
});
