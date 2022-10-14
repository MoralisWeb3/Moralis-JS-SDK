import MoralisCore from '@moralisweb3/core';
import { setupStreams } from '../../test/setup';
import { EvmStreamResult } from './EvmStreamResult';
import { mockEvmStreamResult } from './EvmStreamResult.mock';

const testsInputs = Object.entries(mockEvmStreamResult).map(([name, input]) => ({ name, input }));

describe('EvmStreamResult', () => {
  let core: MoralisCore;

  beforeAll(() => {
    core = setupStreams();
  });

  it.each(testsInputs)('should create succesfully for: $name', ({ input }) => {
    const streamResult = EvmStreamResult.create(input, core);
    const output = streamResult.format();

    expect(streamResult).toBeDefined();
    expect(output).toBeDefined();
  });

  it('should not decode logs when no Abi is provided', () => {
    const streamResult = EvmStreamResult.create(mockEvmStreamResult.NATIVE_TX, core);

    const logs = streamResult.decodedLogs;

    expect(logs.length).toBe(0);
  });

  it('should decode logs', () => {
    const streamResult = EvmStreamResult.create(mockEvmStreamResult.WETH_EVENTS, core);

    const logs = streamResult.decodedLogs;

    expect(logs[0]).toMatchObject({
      args: {
        src: '0x57C1e0C2ADf6EECDb135BcF9ec5F23b319be2c94',
        dst: '0xa6Cc3C2531FdaA6Ae1A3CA84c2855806728693e8',
        wad: expect.objectContaining({
          _hex: '0xec8d2a63695efe77',
          _isBigNumber: true,
        }),
      },
      name: 'Transfer',
      signature: 'Transfer(address,address,uint256)',
      topic: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
    });
  });
});
