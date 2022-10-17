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

  it('should parse the data correctly with empty data', () => {
    const streamResult = EvmStreamResult.create(mockEvmStreamResult.INITIAL_TEST, core);

    // We expect to default to chainId 0x1 on the intial test response, that provides an empty string as chainId
    expect(streamResult.chain.apiHex).toBe('0x1');
    expect(streamResult.retries).toBe(0);
    expect(streamResult.confirmed).toBe(true);
    expect(streamResult.block.chain.apiHex).toBe('0x1');
    expect(streamResult.block.hash).toBe('');
    expect(streamResult.block.number.toString()).toBe('0');
    expect(streamResult.erc20Transfers.length).toBe(0);
    expect(streamResult.erc20Approvals.length).toBe(0);
    expect(streamResult.nftTransfers.length).toBe(0);
    expect(streamResult.nftApprovals.ERC1155.length).toBe(0);
    expect(streamResult.nftApprovals.ERC721.length).toBe(0);
    expect(streamResult.logs.length).toBe(0);
    expect(streamResult.txs.length).toBe(0);
    expect(streamResult.txsInternal.length).toBe(0);

    expect(streamResult.toJSON()).toStrictEqual({
      abi: [],
      block: {
        chain: '0x1',
        hash: '',
        number: '0',
        timestamp: new Date('0'),
      },
      chain: '0x1',
      confirmed: true,
      erc20Approvals: [],
      erc20Transfers: [],
      logs: [],
      nftApprovals: {
        ERC1155: [],
        ERC721: [],
      },
      nftTransfers: [],
      retries: 0,
      txs: [],
      txsInternal: [],
      streamId: '',
      tag: '',
    });
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

  it('should return return true for .equals() on equality match', () => {
    const streamResult = EvmStreamResult.create(mockEvmStreamResult.WETH_EVENTS, core);

    const isEqual = streamResult.equals({
      ...mockEvmStreamResult.WETH_EVENTS,
    });

    expect(isEqual).toBe(true);
  });

  it('should return return false for .equals() on mismatching chain', () => {
    const streamResult = EvmStreamResult.create(mockEvmStreamResult.WETH_EVENTS, core);

    const isEqual = streamResult.equals({
      ...mockEvmStreamResult.WETH_EVENTS,
      chainId: '0x2',
    });

    expect(isEqual).toBe(false);
  });

  it('should return return false for .equals() on mismatching tag', () => {
    const streamResult = EvmStreamResult.create(mockEvmStreamResult.WETH_EVENTS, core);

    const isEqual = streamResult.equals({
      ...mockEvmStreamResult.WETH_EVENTS,
      tag: 'no-weth',
    });

    expect(isEqual).toBe(false);
  });

  it('should return return false for .equals() on mismatching streamId', () => {
    const streamResult = EvmStreamResult.create(mockEvmStreamResult.WETH_EVENTS, core);

    const isEqual = streamResult.equals({
      ...mockEvmStreamResult.WETH_EVENTS,
      streamId: 'e2db09ab-71a5-44b1-8646-4d16feb7592b',
    });

    expect(isEqual).toBe(false);
  });

  it('should return return false for .equals() on mismatching confirmed', () => {
    const streamResult = EvmStreamResult.create(mockEvmStreamResult.WETH_EVENTS, core);

    const isEqual = streamResult.equals({
      ...mockEvmStreamResult.WETH_EVENTS,
      confirmed: false,
    });

    expect(isEqual).toBe(false);
  });

  it('should return return false for .equals() on mismatching block', () => {
    const streamResult = EvmStreamResult.create(mockEvmStreamResult.WETH_EVENTS, core);

    const isEqual = streamResult.equals({
      ...mockEvmStreamResult.WETH_EVENTS,
      block: {
        ...mockEvmStreamResult.WETH_EVENTS.block,
        hash: '0x1112a6bcb6280bad1ebfa8b0ab3869baf66d8da060b7d76024ed2742269080b0',
      },
    });

    expect(isEqual).toBe(false);
  });
});
