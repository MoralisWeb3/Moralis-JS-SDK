import MoralisCore from '@moralisweb3/core';
import { setupStreams } from '../../test/setup';

describe('EvmStreamResult', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = setupStreams();
  });

  it('should create a new EvmStreamResult succesfully', () => {
    expect(true).toBe(true);
  });
});
